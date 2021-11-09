<?php

namespace App\Http\Controllers;

use App\Models\Employees;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class EmployeesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // listing employees
        $file = public_path('json/employees.json');
        if(file_exists($file)) {
            $inp = file_get_contents($file);
            $jsonData = json_decode($inp,true);
            return response()->json($jsonData, 200);
        } else {
            return response()->json([], 200);
        }
    }

    public function getEmployeeById($id)
    {
        $file = public_path('json/employees.json');
        if(file_exists($file)) {
            $inp = file_get_contents($file);
            $jsonData = json_decode($inp,true);

            foreach ($jsonData as $key=> $value){
                if($value['id'] == $id){
                    return response()->json($value, 201);
                }
            }
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->only('first_name','last_name','email','phone','work_hours','salary_type','salary','department');
        // Check existing File
        $file = public_path('json/employees.json');
        // if(file_exists($file)) {
            try {
                if(!file_exists($file)){
                    mkdir("json", 0777, true);
                    $f = fopen($file, "w");
                    fwrite($f, "[]");
                    fclose($f);
                } 
            } catch (\Throwable $th) {
                throw $th;
            }

            $inp = file_get_contents($file);
            $tempArray = json_decode($inp,true);

            // $data['id'] = count($tempArray) + 1;

            foreach ($tempArray as $key=> $value){
                if($value['first_name'] === $data['first_name'] && 
                $value['last_name'] === $data['last_name'] && 
                $value['department'] === $data['department']){
                    return response()->json([
                        'status' => 'failed',
                        'message' => 'Record already exists.',
                    ], 409);
                }
            }

            $data['id'] = uniqid();
            array_push($tempArray, $data);
            $jsonData = json_encode($tempArray);
            file_put_contents($file, $jsonData);
            return response()->json([
                'status' => 'success',
                'message' => 'Employee created successfully.',
            ], 201);
        // }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Employees  $employees
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $file = public_path('json/employees.json');
        if(file_exists($file)) {
            $inp = file_get_contents($file);
            $jsonData = json_decode($inp,true);
            foreach ($jsonData as $key=> $value){
                if($value['id'] == $id){
                    return response()->json($value, 201);
                }
            }
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Employees  $employees
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Employees $employees)
    {
        $req_data = $request->only('id','first_name','last_name','email','phone','work_hours','salary_type','salary','department');
        $file = public_path('json/employees.json');
        if(file_exists($file)) {
            $data = file_get_contents($file);
            $jsonData = json_decode($data, true);

            foreach ($jsonData as $key => $value) {
                if ($value['id'] == $req_data['id']) {
                    $jsonData[$key]['first_name'] = $req_data['first_name'];
                    $jsonData[$key]['last_name'] = $req_data['last_name'];
                    $jsonData[$key]['email'] = $req_data['email'];
                    $jsonData[$key]['phone'] = $req_data['phone'];
                    $jsonData[$key]['work_hours'] = $req_data['work_hours'];
                    $jsonData[$key]['salary_type'] = $req_data['salary_type'];
                    $jsonData[$key]['salary'] = $req_data['salary'];
                    $jsonData[$key]['department'] = $req_data['department'];
                }
            }
            file_put_contents($file, json_encode($jsonData));
            return response()->json([
                'status' => 'success',
                'message' => 'Employee updated successfully.',
            ], 200);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Employees  $employees
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $file = public_path('json/employees.json');
        if(file_exists($file)) {
            $data = file_get_contents($file);
            $jsonData = json_decode($data, true);
            $arr_index = array();
            foreach ($jsonData as $key => $value)
            {
                if ($value['id'] == $id)
                {
                    $arr_index[] = $key;
                }
            }
            foreach ($arr_index as $i)
            {
                unset($jsonData[$i]);
            }
            $jsonData = array_values($jsonData);
            file_put_contents($file, json_encode($jsonData));
            return response()->json([
                'status' => 'success',
                'message' => 'Employee deleted successfully.',
            ], 200);
        }

    }
}
