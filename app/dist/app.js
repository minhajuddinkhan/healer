/**
 * Created by Minhaj on 2/11/2017.
 */
(function () {
    angular.module('appModule',['checklist-model','ngStorage'])
        .constant('API_URL','http://localhost:3000')
        .controller('appCtrl',appCtrl)

    function appCtrl($scope,$http,API_URL,$timeout,$rootScope,$localStorage) {
        console.log('this is app ctrl');

        $scope.duas = [];
        $scope.categories = [];
        $scope.object = {};
        $scope.object.categories =[]
        $scope.registerDua= registerDua;
        $scope.createCategory= createCategory;
        $scope.login= login;
        $scope.$watch('activeTab',function (oldVal,newVal) {
            if($rootScope.user) {
                switch ($scope.activeTab) {
                    case 'mid':
                        getDuas();
                        break;
                    case 'right':
                        getCategories();
                        break;

                }
            }
        });


        function registerDua(object) {
            $http({
                method :'POST',
                url :API_URL+'/api/admin/dua',
                data: object
            }).then(function (res) {
                $timeout(function () {
                    $scope.duas.push(res.data.dua);
                })
                $scope.object= {};
            },function (err) {
                if(err.status == 401){

                    $('#modal1').modal('open');
                }
            })
        }
        function getCategories() {
            $http.get(API_URL+'/api/category').then(function (res) {
                $scope.categories = res.data.categories;
                console.log('$scope.categories ::',$scope.categories);
            },function (err) {
                console.log('err',err);
            })
        }
        function createCategory(category) {

            console.log('category',category);
            $http({
                method : 'POST',
                headers : {'healer-access-token' :   $localStorage['token']},
                url : API_URL+'/api/category',
                data: category
            }).then(function (res) {
                $scope.categories.push(res.data.category);
            },function (err) {
                console.log('err',err.status);
                if(err.status == 401){

                    $('#modal1').modal('open');
                }
            })
        }
        function getDuas() {

            console.log('getting duas..');
            $http.get(API_URL+'/api/duas').then(function (res) {
                $scope.duas = res.data.dua;
            },function (err) {
                console.log('err',err);
            })
        }




        function login(user) {
            console.log('user',user);
            $http({
                method :'POST',
                url : API_URL+'/api/login',
                data : user
            }).then(function (res) {
                $rootScope.user = res.data.user;
                $localStorage['token'] = res.data.user.jwt;
                Materialize.toast(res.data.message, 2000)
                $('#modal1').modal('close');
                getDuas();
                getCategories();
            },function (err) {
                console.log('err',err);
                Materialize.toast(err.data.message, 2000)
            })
        }
        function initModal() {
        }


        function checkIfLoggedIn(cb) {

            console.log('$localStorage.token',$localStorage.token);
            if($localStorage.token){
                console.log('token present..');
                if($rootScope.user){
                    console.log('rootscope.user is present');
                    cb(null,true)
                }else {
                    $http({
                        method : 'GET',
                        headers : {'healer-access-token' :   $localStorage['token']},
                        url : API_URL+'/api/me'
                    }).then(function (res) {
                        console.log('res',res);
                        $rootScope.user = res.data.user;
                        cb(null,true);
                    },function (err) {
                        $(document).ready(function() {

                            $('#modal1').modal('open');
                        });
                    })

                }

            }else{
                console.log('no token');
                cb(true);
            }

        }
        function init() {

            $(document).ready(function(){
                // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
                $('.modal').modal({
                    dismissible: false, // Modal can be dismissed by clicking outside of the modal
                    opacity: .5, // Opacity of modal background
                    inDuration: 300, // Transition in duration
                    outDuration: 200, // Transition out duration
                    startingTop: '4%', // Starting top style attribute
                    endingTop: '10%', // Ending top style attribute
                    complete: function() { $scope.user = "" } // Callback for Modal close
                });
            });

            checkIfLoggedIn(function (err,success) {
                console.log('err',err);
                console.log('success',success);
                if(err){

                    $(document).ready(function() {

                        $('#modal1').modal('open');
                    });
                }
                else{
                    console.log('is logged in..');
                    getDuas();
                    getCategories();

                }
            })
        }
        init()

    }

}());