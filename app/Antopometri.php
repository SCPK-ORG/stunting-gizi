<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Antopometri extends Model
{
    protected $primaryKey = "id";
    protected $fillable = ['umur', 'jenis_kelamin', 'min1sd', 'median', 'plus1sd'];
}
