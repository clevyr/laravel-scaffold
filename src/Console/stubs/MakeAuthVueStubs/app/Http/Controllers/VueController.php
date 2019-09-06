<?php

namespace App\Http\Controllers;

class VueController extends Controller
{
    /**
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('vue');
    }
}
