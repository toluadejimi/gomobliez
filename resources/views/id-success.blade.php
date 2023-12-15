<!DOCTYPE html>
<html lang="en" style="background: #ffc700;">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <title>Untitled</title>
    <link rel="stylesheet" href="{{ url('') }}/public/assets/bootstrap/css/bootstrap.min.css">
</head>

<body style="background: #ffc700;">
    <section class="py-4 py-xl-5">
        <div class="container">
            <div class="row d-flex justify-content-center">
                <div class="col-md-8 col-lg-6 col-xl-5 col-xxl-4" style="text-align: center;">
                    <img src="{{ url('') }}/public/assets/img/darklogo.png" height="25" width="100" class="mt-5"
                        style="text-align: center;">
                    <div class="card mt-5"
                        style="border-radius: 20px;border-width: 8px;background: rgb(11,11,11);text-align: center;">
                        <div class="card-body" style="text-align: center;background: #000000;border-radius: 300px;">
                            <img src="{{ url('') }}/public/assets/img/okay.png" height="100" width="100"
                                style="text-align: center;">

                                <h4 class="card-title"
                                style="font-size: 13.48px;padding-top: 28px;color: var(--bs-card-bg);">ID Submitted Successfully</h4>
                           
                            <h6 class="text-muted card-subtitle mb-2"></h6>
                            <p class="card-text" style="color: rgb(159,159,159);font-size: 10px;padding-top: 21px;">we
                                will notify you on your registered email, Kindly check your spam folder if not found in inbox</p>

                            <form action="upload-id" method="get">
                                @csrf

                                <a href="/home" class="btn btn-primary" type="submit"
                                    style="color: rgb(0,0,0);background: rgb(255,199,0);font-size: 13px;margin-top: 16px;margin-bottom: 24px;border-style: none;">Go back
                                    home</a>


            
                            </form>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <script src="{{ url('') }}/public/assets/bootstrap/js/bootstrap.min.js"></script>
</body>

</html>
