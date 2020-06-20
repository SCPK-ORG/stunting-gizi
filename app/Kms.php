<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Kms extends Model
{
    // protected $primaryKey = 'id_balita';
    // protected $dates = ['date_of_birth'];
    protected $fillable = ['id_balita', 'umur', 'berat_badan', 'id_antopometri', 'z_score', 'status_gizi'];
    // public $timestamps = true;
}
