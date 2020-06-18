<!DOCTYPE html>
<html lang="en">

<head>

  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="">
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
      <li class="nav-item active">
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
            <h1 class="h3 mb-0 text-gray-800">Tabel Balita</h1>
            <a href="#" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i class="fas fa-download fa-sm text-white-50"></i> Generate Report</a>
          </div>
          <button class="btn btn-success d-block" type="button" href="#" data-toggle="modal" data-target="#tambahBalitaModal">
            <i class="fas fa-child  fa-sm fa-fw mr-2 text-white-400"></i>
            Tambah Data Balita
          </button>
          <br>

          <!-- Content Row SCPK -->
          <table class="table table-responsive-lg">
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
              </tr>
            </thead>
            <tbody>
              @if($balitas->isEmpty() == false)
                @foreach($balitas as $index => $balita)
                <tr>
                  <th scope="row">{{ $index +1 }}</th>
                  <td>{{ $balita->nama }}</td>
                  <td>{{ $balita->jenis_kelamin }}</td>
                  <td>{{ $balita->tempat_lahir }}</td>
                  <td>{{ $balita->tanggal_lahir }}</td>
                  <td>{{ $balita->nama_ortu }}</td>
                  <td>{{ $balita->alamat_ortu }}</td>
                  <td>{{ $balita->no_hp_ortu }}</td>
                  <td>
                    <form action="{{ url('/d_balitas/'.$balita->id_balitas.'/destroy') }}" method="post">
                      @csrf
                      @method('delete')
                      <button type="submit" class="btn btn-danger btn- py-0">Hapus</button>
                    </form>
                  </td>
                  <td>
                    <form action="{{ url('/d_balitas/'.$balita->id_balitas.'/destroy') }}" method="post">
                      @csrf
                      @method('delete')
                      <button type="submit" class="btn btn-danger btn- py-0">Edit</button>
                    </form>
                  </td>
                </tr>
                @endforeach
              @endif
            </tbody>
          </table>

        </div>
        <!-- /.container-fluid -->

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
  <div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Anda yakin ingin keluar ?</h5>
          <button class="close" type="button" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body">Jika anda keluar maka aktivitas anda akan di akhiri.</div>
        <div class="modal-footer">
          <button class="btn btn-secondary" type="button" data-dismiss="modal">Batal</button>
          <a class="btn btn-primary" href="{{ url('/logout') }}">Keluar</a>
        </div>
      </div>
    </div>
  </div>

  <!-- Tambah Balita Modal-->
  <div class="modal fade" id="tambahBalitaModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Tambah Data Balita</h5>
          <button class="close" type="button" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body">
          <form action="{{-- url('/d_balita') --}}" method="post" id="postBalita" autocomplete="off">
            @method('post')
            @csrf
            <div class="form-group">
              <label for="nama">Nama Balita</label>
              <input type="text" id="nama" name="nama" class="form-control" id="exampleFormControlInput1" placeholder="Enter your name...">
            </div>
            <div class="form-group">
              <label class="d-block" for="jenis_kelamin">Jenis Kelamin</label>
              <div class="custom-control custom-radio custom-control-inline">
                <input required type="radio" class="custom-control-input" id="customRadio" name="jenis_kelamin" value="Laki-Laki">
                <label class=" custom-control-label" for="customRadio">Laki-Laki</label>
              </div>
              <div class="custom-control custom-radio custom-control-inline">
                <input required type="radio" class="custom-control-input" id="customRadio2" name="jenis_kelamin" value="Perempuan">
                <label class="custom-control-label" for="customRadio2">Perempuan</label>
              </div>
            </div>
            <div class="form-group">
              <label for="tempat_lahir">Tempat Lahir</label>
              <input type="text" id="tempat_lahir" name="tempat_lahir" class="form-control" id="exampleFormControlInput1" placeholder="Enter your name...">
            </div>
            <div class="form-group">
              <label for="tanggal_lahir" class="">Tanggal Lahir</label>
              <input class="form-control" type="date" name="tanggal_lahir">
            </div>
            <div class="form-group">
              <label for="nama_ortu">Nama Orangtua</label>
              <input type="text" id="nama_ortu" name="nama_ortu" class="form-control" id="exampleFormControlInput1" placeholder="Enter your name...">
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" id="email" name="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com">
            </div>
            <div class="form-group">
              <label for="alamat_ortu">Alamat Orangtua</label>
              <textarea class="form-control" id="alamat_ortu" placeholder="e.g. I Love Cats." name="alamat_ortu"></textarea>
            </div>
            <div class="form-group">
              <label for="no_hp_ortu">Nomor HP</label>
              <input type="text" id="no_hp_ortu" name="no_hp_ortu" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com">
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
            <button class="btn btn-primary" type="submit" value="submit" >Submit</button>
            <!-- <a class="btn btn-primary" href="{{ url('/logout') }}">Logout</a> -->
          </div>
        </form>
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

  <!-- Page level plugins -->
  <script src="{{ asset('assets/lib/chart.js/Chart.min.js') }}"></script>

  <!-- Page level custom scripts -->
  <script src="{{ asset('assets/js/demo/chart-area-demo.js') }}"></script>
  <script src="{{ asset('assets/js/demo/chart-pie-demo.js') }}"></script>
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>

</body>

</html>

<script>
  $('#postBalita').on('submit', function(e) {
      e.preventDefault();

      // var current = $(this).val();
      // var destination = $(this).val();
      // var departure_date = $(this).val();
      // var trip_duration = $(this).val();
      // var note = $(this).val();

      // $.ajaxSetup({
      //     headers: {
      //       'X-CSRF-TOKEN': $('inpt[name="__token"]').attr('value')
      //     }
      // });

      $.ajax({
          url: "{{ url('/d_balita') }}",
          method: 'post',
          data: $('#postBalita').serialize(),
          // headers: {
          //   'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          // },

          // dataType: 'JSON',
          cache: false,
          success: function(response) {
            // swal("Success!", val, "success");
            res = response.responseJSON;
            console.log(res);
            window.location.href = "{{ url('/d_balita') }}";
          },
          error: function(xhr) {
            var res = '';
            res = xhr.responseJSON;
            console.log(res);
            if ($.isEmptyObject(res) == false) {
              // $.each(res.errors, function(key, val) {
              //   text += val + "\n"
              // });
              // Swal.fire(
              //   "Invalid!", text, "error"
              // );
              $.each(res.errors, function(key, val) {
                Swal.fire("Invalid!", val, "error");
              });
            }
          }
      });
  });

  // $(function() {
  //       $('#tambahAnggotaModal').on('hidden.bs.modal', function(){
  //           $(this).removeData('bs.modal');
  //       });
  //   });
  // $modal = $('#tambahAnggotaModal');
  //   $modal.find('#postAnggota')[0].reset();
</script>