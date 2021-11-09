<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use \App\Http\Controllers\EmployeesController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*$employeeData = array(
    array(
        "id" => 1,
        "first_name"=>"Jasmit",
        "last_name" => "Mehra",
        "phone" => "857412364",
        "email" => "jasmit.m222@gmail.com"
    ), array(
        "id" => 2,
        "first_name" => "Kiran",
        "last_name" => "Chopra",
        "phone"=> "748596520","email"=> "kiran.424@ymail.com")
);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/employees', function () {
    return response()->json([[
        "id" => 1,
        "first_name" => "Jasmit",
        "last_name" => "Mehra",
        "email" => "jasmit.m222@gmail.com",
        "phone" => "857412364",
        "department" => 3,
    ], [
        "id" => 2,
        "first_name" => "Kiran",
        "last_name" => "Chopra",
        "email" => "kiran.424@ymail.com",
        "phone" => "748596520",
        "department" => 2,
    ]]);
});
*/

Route::get('/employees',[EmployeesController::class, 'index']);
Route::get('/get-employee/{id}',[EmployeesController::class, 'getEmployeeById']);
Route::post('/create-employee', [EmployeesController::class, 'store']);
Route::put('/edit-employee/{id}',[EmployeesController::class, 'update']);
Route::delete('/employee/{id}', [EmployeesController::class, 'destroy']);
