<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Kms extends Model
{
    // protected $primaryKey = 'id_balita';
    // protected $dates = ['date_of_birth'];
    protected $fillable = ['id_balita', 'umur', 'tinggi_badan', 'berat_badan', 'imunisasi', 'id_antopometry', 'z-score', 'status_gizi'];
    public $timestamps = false;
}
