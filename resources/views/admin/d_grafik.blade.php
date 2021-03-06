<!DOCTYPE html>
<html lang="en">

<head>

  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <meta name="author" content="">

  <title>SB Admin 2 - Dashboard</title>

  <!-- Custom fonts for this template-->
  <link href="{{ asset('assets/lib/fontawesome-free/css/all.min.css') }}" rel="stylesheet" type="text/css">
  <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet">

  <!-- Custom styles for this template-->
  <link href="{{ asset('assets/css/sb-admin-2.min.css') }}" rel="stylesheet">

</head>

<body id="page-top">

  <!-- Page Wrapper -->
  <div id="wrapper">

    <!-- Sidebar -->
    <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

      <!-- Sidebar - Brand -->
      <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
        <div class="sidebar-brand-icon rotate-n-15">
          <i class="fas fa-laugh-wink"></i>
        </div>
        <div class="sidebar-brand-text mx-3">Posyandu <sup>2</sup></div>
      </a>

      <!-- Divider -->
      <hr class="sidebar-divider my-0">

      <!-- Nav Item - Dashboard -->
      <li class="nav-item">
        <a class="nav-link" href="{{ url('/dashboard') }}">
          <i class="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard</span></a>
      </li>

      <!-- Divider -->
      <hr class="sidebar-divider">
      
      <!-- Nav Item - Data Anggota -->
      <li class="nav-item">
        <a class="nav-link" href="{{ url('/d_anggota') }}">
          <i class="fas fa-fw fa-table"></i>
          <span>Data Anggota</span></a>
      </li>

      <!-- Nav Item - Data Balita -->
      <li class="nav-item">
        <a class="nav-link" href="{{ url('/d_balita') }}">
          <i class="fas fa-fw fa-table"></i>
          <span>Data Balita</span></a>
      </li>

      <!-- Nav Item - KMS -->
      <li class="nav-item">
        <a class="nav-link" href="{{ url('/d_kms') }}">
          <i class="fas fa-fw fa-table"></i>
          <span>KMS</span></a>
      </li>

      <!-- Nav Item - Grafik Balita -->
      <li class="nav-item active">
        <a class="nav-link" href="{{ url('/d_grafik') }}">
          <i class="fas fa-fw fa-table"></i>
          <span>Grafik Balita</span></a>
      </li>

      <!-- Divider -->
      <hr class="sidebar-divider d-none d-md-block">

      <!-- Sidebar Toggler (Sidebar) -->
      <div class="text-center d-none d-md-inline">
        <button class="rounded-circle border-0" id="sidebarToggle"></button>
      </div>

    </ul>
    <!-- End of Sidebar -->

    <!-- Content Wrapper -->
    <div id="content-wrapper" class="d-flex flex-column">

      <!-- Main Content -->
      <div id="content">

        <!-- Topbar -->
        <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

          <!-- Sidebar Toggle (Topbar) -->
          <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
            <i class="fa fa-bars"></i>
          </button>

          <!-- Topbar Search -->
          <form class="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
            <div class="input-group">
              <input type="text" class="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2">
              <div class="input-group-append">
                <button class="btn btn-primary" type="button">
                  <i class="fas fa-search fa-sm"></i>
                </button>
              </div>
            </div>
          </form>

          <!-- Topbar Navbar -->
          <ul class="navbar-nav ml-auto">

            <div class="topbar-divider d-none d-sm-block"></div>

            <!-- Nav Item - User Information -->
            <li class="nav-item dropdown no-arrow">
              <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span class="mr-2 d-none d-lg-inline text-gray-600 small">{{ auth()->user()->name }} admin</span>
                <img class="img-profile rounded-circle" src="https://source.unsplash.com/QAB-WJcbgJk/60x60">
              </a>
              <!-- Dropdown - User Information -->
              <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                <a class="dropdown-item" href="#">
                  <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                  Profile
                </a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                  <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                  Logout
                </a>
              </div>
            </li>

          </ul>

        </nav>
        <!-- End of Topbar -->

        <!-- Begin Page Content -->
        <div class="container-fluid">

          <!-- Page Heading -->
          <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Data KMS</h1>
            <a href="#" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i class="fas fa-download fa-sm text-white-50"></i> Generate Report</a>
          </div>

          <!-- Tabel Content KMS -->
          <table class="table table-hover table-responsive-lg" id="dataBalitaKMS">
            <thead>
              <tr class="text-dark">
                <th scope="col">No</th>
                <th scope="col">Nama Balita</th>
                <th scope="col">Jenis Kelamin</th>
                <th scope="col">Tempat Lahir</th>
                <th scope="col">Tanggal Lahir</th>
                <th scope="col">Nama Orangtua</th>
                <th scope="col">Alamat Orangtua</th>
                <th scope="col">Nomor HP</th>
                <th scope="col">Status Gizi Sekarang</th>
              </tr>
            </thead>
            <tbody>
              @if($balitas->isEmpty() == false)
                @foreach($balitas as $index => $balita)
                <tr>
                  <th scope="row">{{ $index +1 }}</th>
                  <td class="d-none">{{ $balita->id_balita }}</td>
                  <td>{{ $balita->nama }}</td>
                  <td>{{ $balita->jenis_kelamin }}</td>
                  <td>{{ $balita->tempat_lahir }}</td>
                  <td>{{ $balita->tanggal_lahir }}</td>
                  <td>{{ $balita->nama_ortu }}</td>
                  <td>{{ $balita->alamat_ortu }}</td>
                  <td>{{ $balita->no_hp_ortu }}</td>
                  {{--<td>
                    <form action="{{ url('/d_balitas/'.$balita->id_balitas.'/destroy') }}" method="post" class="d-inline-block">
                      @csrf
                      @method('delete')
                      <button type="submit" class="btn btn-danger btn- py-0">Hapus</button>
                    </form>
                    <form action="{{ url('/d_balitas/'.$balita->id_balitas.'/destroy') }}" method="post" class="d-inline-block">
                      @csrf
                      @method('delete')
                      <button type="submit" class="btn btn-danger btn- py-0">Edit</button>
                    </form>
                  </td>--}}
                  <td>
                    
                  </td>
                </tr>
                @endforeach
              @endif
            </tbody>
          </table>

          <!-- content chart grafik -->
          <div class="row mx-auto mb-1 d-none" id="lineChartKMSCanvas" style="height:300px;min-width:100px;max-width:2000px;">
            <canvas id="lineChartKMS"></canvas>
          </div>

        </div>
        <!-- /.container-fluid -->

      </div>
      
      <div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="#" class="card-link">Card link</a>
          <a href="#" class="card-link">Another link</a>
        </div>
      </div>
      <!-- End of Main Content -->

      <!-- Footer -->
      <footer class="sticky-footer bg-white">
        <div class="container my-auto">
          <div class="copyright text-center my-auto">
            <span>Copyright &copy; Your Website 2019</span>
          </div>
        </div>
      </footer>
      <!-- End of Footer -->

    </div>
    <!-- End of Content Wrapper -->

  </div>
  <!-- End of Page Wrapper -->

  <!-- Scroll to Top Button-->
  <a class="scroll-to-top rounded" href="#page-top">
    <i class="fas fa-angle-up"></i>
  </a>

  <!-- Logout Modal-->
  <div class="modal fade" id="tambahKMSModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Tambah Data KMS</h5>
          <button class="close" type="button" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body">
          <form action="{{ url('/d_kms') }}" method="post" autocomplete="off" id="postKMS">
            @method('post')
            <div class="form-group">
              <label for="nama">Nama Balita</label>
              <input type="text" id="id_balita" name="id_balita" class="form-control"  style="display:none;" id="exampleFormControlInput1" placeholder="Enter your name...">
              <input type="text" id="nama" name="nama" class="form-control" id="exampleFormControlInput1" placeholder="Enter your name...">
              <div id="nama_list" style="z-index:30 !important;">
              </div>              
              {{ csrf_field() }}
            </div>
            <div class="form-group">
              <label for="berat_badan">Berat Badan</label>
              <input type="text" id="berat_badan" name="berat_badan" class="form-control" id="exampleFormControlInput1" placeholder="Enter your name...">
            </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" type="button" data-dismiss="modal">Batal</button>
          <button class="btn btn-secondary" type="submit">Submit</button>
          </form>
          <!-- <a class="btn btn-primary" href="{{-- url('/logout')  --}}">Keluar</a> -->
        </div>
      </div>
    </div>
  </div>

  <!-- Bootstrap core JavaScript-->
  <script src="{{ asset('assets/lib/jquery/jquery.min.js') }}"></script>
  <script src="{{ asset('assets/lib/bootstrap/js/bootstrap.bundle.min.js') }}"></script>

  <!-- Core plugin JavaScript-->
  <script src="{{ asset('assets/lib/jquery-easing/jquery.easing.min.js') }}"></script>

  <!-- Custom scripts for all pages-->
  <script src="{{ asset('assets/js/sb-admin-2.min.js') }}"></script>

  <!-- chartjs -->
  <script src="{{ asset('assets/lib/chartjs/Chart.bundle.min.js') }}"></script>
  <script src="{{ asset('assets/lib/chartjs/Chart.min.js') }}"></script>

  <!-- alert -->
  <script src="{{ asset('assets/lib/SweetAlert2/sweetalert2.js') }}"></script>
  
<script src="{{ asset('assets/lib/Highcharts/highcharts.js.map') }}"></script>
<script src="{{ asset('assets/lib/Highcharts/highcharts.js') }}"></script>
  <!-- <script src="https://code.highcharts.com/highcharts.js"></script> -->


</body>

</html>
<script>
$(document).ready(function(){
  var kategori = [];
  $('#nama').keyup(function(){ 
      let query = $(this).val();
      if(query != "")
      {
        let _token = $('input[name="_token"]').val();
        $.ajax({
          url:'{{ route("autocomplete.fetch") }}',
          method:"POST",
          data:{query:query, _token:_token},
          success:function(data){
            $('#nama_list').fadeIn();  
            $('#nama_list').html(data);
          }
        });
      }
      else{
        $('.nama_list').remove();
      }
  });

  $(document).on('click', 'li', function(){
      let id = $(this).attr('id');
      // console.log(id);  
      $('#nama').val($(this).text());
      $('#id_balita').val(id);
      $('#nama_list').fadeOut();  
  });

  $('#postKMS').on('submit', function(e) {
    e.preventDefault();

    $.ajax({
        url: "{{ url('/d_kms') }}",
        method: 'post',
        data: $('#postKMS').serialize(),

        // dataType: 'JSON',
        cache: false,
        success: function(response) {
          // swal("Success!", val, "success");
          res = response.responseJSON;
          // console.log(res);
          window.location.href = "{{ url('/d_kms') }}";
        },
        error: function(xhr) {
          var res = '';
          res = xhr.responseJSON;
          // console.log(res);
          if ($.isEmptyObject(res) == false) {
            $.each(res.errors, function(key, val) {
              Swal.fire("Invalid!", val, "error");
            });
          }
        }
    });
  });

  function addRowHandlers() {
    let table = document.getElementById("dataBalitaKMS");
    let rows = table.getElementsByTagName("tr");
    for (i = 0; i < rows.length; i++) {
      let currentRow = table.rows[i];
      let createClickHandler = function(row) {
        return function() {
          try {
            let cell = row.getElementsByTagName("td")[0];
            let id = cell.innerHTML;
            // console.log(id);
            $( "#lineChartKMSCanvas" ).removeClass( "d-none" ).addClass( "d-flex" );
            chartKMS(id);
          } catch (error) {
            $( "#lineChartKMSCanvas" ).removeClass( "d-flex" ).addClass( "d-none" );
            // console.log(error);
          }
        };
      };
      currentRow.onclick = createClickHandler(currentRow);
    }
  }
  window.onload = addRowHandlers();

  function chartKMS(id) {
    // console.log(id);
    let _token = $('meta[name="csrf-token"]').attr('content');
    try {
      $.ajax({
        url:"{{ route('kms.chart') }}",
        method:"POST",
        data:{id:id, _token:_token},
        success:function(data){
          // jQuery.parseJSON(JSON.stringify(data));
          // console.log(this.data)
          // var res = '';
          // res = data.responseJSON;
          // options.xAxis.categories = data.categories;
          // options.series = response.series;
          // chart1 = new Highcharts.Chart(options);
          if(data.nama != "" || data.nama != null){
            graphChart(data)
          }
          else{
            $( "#lineChartKMSCanvas" ).removeClass( "d-flex" );
            // $( "#lineChartKMSCanvas" ).removeClass( "d-flex" ).addClass( "d-none" );
          }
          
          // $.each(data.categories, function(key, val) {
          //   kategori.push(val);
          // });
          // console.log(kategori);
          // $('#nama_list').fadeIn();  
          // $('#nama_list').html(data);
        }
      });
    } catch (error) {
      $( "#lineChartKMSCanvas" ).removeClass( "d-flex" ).addClass( "d-none" );
    }
  }
  
  function graphChart(data){
    
    Highcharts.chart('lineChartKMSCanvas', {

      title: {
          text: 'Laporan Grafik Hasil KMS ' + data.nama
      },

      subtitle: {
          // text: 'Source: thesolarfoundation.com'
      },

      yAxis: {
          title: {
              text: 'BB(KG)'
          }
      },

      xAxis: {
          categories : data.categories,
          // accessibility: {
          //     rangeDescription: 'Range: 2010 to 2017'
          // }
      },

      legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle'
      },

      plotOptions: {
          series: {
              label: {
                  connectorAllowed: false
              },
              // pointStart: 2010
          },
      },

      series: [
        {
          name: 'Berat',
          data:  data.berat
        }, 
        // {
        //   name: 'Status Gizi',
        //   data: data.statusgizi
        // }, 
      ],

      responsive: {
          rules: [{
              condition: {
                  minWidth: 100,
                  maxWidth: 2000
              },
              chartOptions: {
                  legend: {
                      layout: 'horizontal',
                      align: 'center',
                      verticalAlign: 'bottom',
                      // width: '800px',
                  }
              }
          }]
      }

    });
  }

  function graph(data){
    var ctx = document.getElementById('lineChartKMS').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'My First dataset',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: [0, 10, 5, 2, 20, 30, 45]
            }]
        },

        // Configuration options go here
        options: {}
    });
  }
    
});


</script>