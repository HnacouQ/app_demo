<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function (Request $req) {
});
Route::get('/authorize','AuthController@index');

 Route::group(['prefix' => 'admin'], function(){
    Route::any('/{path}', 'AdminController@index')->where('path', '.*');
});
Route::get('/get-all-Product','AdminController@getAllProduct');
Route::get('/get-themes','AdminController@getThemes');
Route::post('/install','AdminController@install');
Route::post('/uninstall','AdminController@uninstall');
Route::post('/add-whishlist','AdminController@addWhishList');
Route::post('/remove-whishlist','AdminController@removeWhishList');
Route::get('/test','AdminController@test');

Route::any('hooks/products/update',   'HookController@productUpdates');
Route::any('hooks/cart/update',   'HookController@cartUpdate');
