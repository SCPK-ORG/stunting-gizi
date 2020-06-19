<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Antopometri extends Model
{
    protected $fillable = ['umur', 'jenis_kelamin', '-1sd', 'median', '+1sd'];
}
