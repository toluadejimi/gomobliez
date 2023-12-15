<!DOCTYPE html>
<html lang="en" style="background: #ffc700;">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <title>Untitled</title>
    <link rel="stylesheet" href="{{ url('') }}/public/assets/assets/bootstrap/css/bootstrap.min.css">

    <style>
   
    body {
       margin:0px;
       height:100vh;
       background: #1283da;
     }
     .center {
       height:100%;
       display:flex;
       align-items:center;
       justify-content:center;
     
     }
     .form-input {
       width:350px;
       padding:20px;
       background:#fff;
       box-shadow: -3px -3px 7px rgba(94, 104, 121, 0.377),
                   3px 3px 7px rgba(94, 104, 121, 0.377);
     }
     .form-input input {
       display:none;
     
     }
     .form-input label {
       display:block;
       width:45%;
       height:45px;
       margin-left: 25%;
       line-height:50px;
       text-align:center;
       background:#1172c2;
     
       color:#fff;
       font-size:15px;
       font-family:"Open Sans",sans-serif;
       text-transform:Uppercase;
       font-weight:600;
       border-radius:5px;
       cursor:pointer;
     }
     
     .form-input img {
       width:100%;
       display:none;
     
       margin-bottom:30px;
     }
     
        
       </style>

   
</head>

           

<body style="background: #ffc700;">
    <section class="py-6 py-xl-5">
        <div class="container">
            <div class="row d-flex justify-content-center" style="margin-left:0px;margin-right: 0px;padding-left:1px;padding-right: 1px">
                <div class="col-md-8 col-lg-6 col-xl-5 col-xxl-4" style="text-align: center;">
                    <img src="{{ url('') }}/public/assets/img/darklogo.png" height="25" width="100" class="mt-5"
                        style="text-align: center;">
                    <div class="card mt-5"
                        style="border-radius: 20px;border-width: 8px;background: rgb(11,11,11);text-align: center;">
                        <div class="card-body" style="text-align: center;background: #000000;border-radius: 300px;">
                            <img src="{{ url('') }}/public/assets/img/idimage.png" height="100" width="100"
                                style="text-align: center;">
                            <h4 class="card-title"
                                style="font-size: 13.48px;padding-top: 28px;color: var(--bs-card-bg);">Upload Valid
                                Goverment Issued ID</h4>
                            <h6 class="text-muted card-subtitle mb-2"></h6>


                            <form action="/verify-account-id" method="POST" enctype="multipart/form-data">
                                @csrf


                                <div class="row">
                                <label class="mt-5 text-white">Choose Country</label>
                                <select
                                    style="color: rgb(0,0,0);background: rgb(255,199,0);font-size: 13px;margin-top: 16px;border-style: none;"
                                    class="form-control" required name="country">
                                    <option value="">Select Country</option>
                                    @foreach($country as $data)
                                    <option value="{{$data->id}}">{{$data->flag}} {{$data->name}}</option>
                                    @endforeach

                                </select>
                                <hr>


                                <label class="text-white">Choose ID Type</label>
                                <select
                                    style="color: rgb(0,0,0);background: rgb(255,199,0);font-size: 13px;margin-top: 16px;margin-bottom: 24px;border-style: none;"
                                    class="form-control" required name="id_type">
                                    <option value="">Select ID Type</option>
                                    <option value="dl">Drivers Licence</option>
                                    <option value="int_p">International Passport</option>
                                    <option value="nat">National ID Card</option>


                                </select>
                                <hr>
                            </div>

                                <h6 class="text-white my-3">Upload Front ID</h6>
                                <div class="center">
                                    <div class="form-input" style="color: rgb(0,0,0);background: rgb(4, 4, 4);font-size: 13px;margin-top: 2px;margin-bottom: 24px;border-style: none;">
                                      <div class="preview">
                                        <img id="file-ip-1-preview">
                                      </div>
                                      <label for="file-ip-1"  style="color: rgb(0,0,0);background: rgb(255,199,0);font-size: 13px;margin-top: 2px;margin-bottom: 24px;border-style: none;">Upload Front ID</label>
                                      <input type="file" required name="front_id" id="file-ip-1" accept="image/*" onchange="showPreview(event);">
                                      <input type="text" name="id"  value="{{ $id }}">

                                      
                                    </div>

                                </div> 

                                <p style="font-size: 10px; color: var(--bs-card-bg);"> Upload clear picture of ID </p>

                                <hr>


                                  <h6 class="text-white my-3">Upload Back ID</h6>
                                <div class="center">
                                    <div class="form-input" name="front_id" style="color: rgb(0,0,0);background: rgb(4, 4, 4);font-size: 13px;margin-top: 2px;margin-bottom: 24px;border-style: none;">
                                      <div class="preview">
                                        <img id="file-ip-2-preview">
                                      </div>
                                      <label for="file-ip-2"  style="color: rgb(0,0,0);background: rgb(255,199,0);font-size: 13px;margin-top: 2px;margin-bottom: 24px;border-style: none;">Upload Back ID</label>
                                      <input type="file" required name="back_id" id="file-ip-2" accept="image/*" onchange="showPreview2(event);">
                                      
                                    </div>
                                  </div> 
                                  <p style="font-size: 10px; color: var(--bs-card-bg);"> Upload clear picture of ID </p>
                                </diV>

                               

                                


                                <button class="btn btn-primary" type="submit"
                                    style="color: rgb(0,0,0);background: rgb(255,199,0);font-size: 13px;margin-top: 16px;margin-bottom: 24px;border-style: none;">Submit
                                </button>


                            </form>


                            <p class="card-text my-5" style="color: rgb(159,159,159);font-size: 10px;padding-top: 21px; padding-buttom: 21px;">we
                                prioritize the security and privacy of our users. To ensure the highest level of
                                protection for your account, we kindly request you to complete the ID verification
                                process.</p>




                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <script src="{{ url('') }}/public/assets/assets/bootstrap/js/bootstrap.min.js"></script>
    <script>
        function showPreview(event){
            if(event.target.files.length > 0){
              var src = URL.createObjectURL(event.target.files[0]);
              var preview = document.getElementById("file-ip-1-preview");
              preview.src = src;
              preview.style.display = "block";
            }
          }


          function showPreview2(event){
            if(event.target.files.length > 0){
              var src = URL.createObjectURL(event.target.files[0]);
              var preview = document.getElementById("file-ip-2-preview");
              preview.src = src;
              preview.style.display = "block";
            }
          }

        
    </script>
</body>

</html>