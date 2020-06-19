<?php

namespace App\Http\Controllers;
use Carbon\Carbon;

use App\Kms;
use App\Balita;
use App\Antopometri;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Validator;

class KmsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $kms = Kms::all();
        $balitas = Balita::all();
        return view('admin.d_kms', compact('kms', 'balitas'));
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
        $validator = Validator::make($request->all(), [
            'nama' => 'required|string|max:255',
            'id_balita' => 'required|int',
            'berat_badan' => 'required|numeric',
        ]);

        if($validator->passes())
        {
            $balitas = Balita::find($request->id_balita);

            //perhitungan umur bulan
            $awal  = date_create($balitas->tanggal_lahir);
            $akhir = date_create(); // waktu sekarang
            $diff  = date_diff( $awal, $akhir ); //selisih

            if($diff->y > 0){
                $m = $diff->y * 12;
                $m += $diff->m;
            }
            else{
                $m = $diff->m * 1;
            }

            $antopometris = Antopometri::where('umur', $m)
                                        ->where('jenis_kelamin', $balitas->jenis_kelamin)
                                        ->get();
            
            $nis = $request->berat_badan;
            $nmbr = $antopometris->pluck('median')->toArray();
            $nmbr = $nmbr[0];
            if($nis < $nmbr)
            {
                $nsbr = $antopometris->pluck('median')->toArray();
            }else
            {

            }
            // $nmbr = $antopometris->all('median');
            dd($antopometris);
        }
        else
        {
            return response()->json(['errors' => $validator->errors()->all()], 422);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Kms  $kms
     * @return \Illuminate\Http\Response
     */
    public function show(Kms $kms)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Kms  $kms
     * @return \Illuminate\Http\Response
     */
    public function edit(Kms $kms)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Kms  $kms
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Kms $kms)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Kms  $kms
     * @return \Illuminate\Http\Response
     */
    public function destroy(Kms $kms)
    {
        //
    }

    public function fetch(Request $request)
    {
        // dd($request);
        if($request->get('query'))
        {
            $query = $request->get('query');
            
            $data = Balita::where('nama', 'LIKE', "%{$query}%")
                            ->get();
            
            // return response()->json(['data' => $data->all()], 200);
            // dd((int)$data->getAgeAttribute());
            $output = '<div class="nama_list" style="position: absolute; cursor: default;z-index:30 !important;"><ul class="dropdown-menu" style="display:block; position:relative">';
            foreach($data as $row)
            {
                // dd($row->age);
                $output .= '
                <li id='.$row->id_balita.'><a href="#" >'.$row->nama.'</a></li>
                ';
            }
            $output .= '</ul></div>';
            return $output;
            // return response()->json(['data' => $data->all()], 200);
        }
    }
}
