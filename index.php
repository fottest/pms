<?php include("process.php"); ?>
<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <title>PMS - Performance Result</title>

    <link rel="canonical" href="https://getbootstrap.com/docs/4.5/examples/floating-labels/">

    <!-- Bootstrap core CSS -->
    <link rel="stylesheet" 
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" 
          integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" 
          crossorigin="anonymous">

    <style>
        .bd-placeholder-img {
            font-size: 1.125rem;
            text-anchor: middle;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }

        @media (min-width: 768px) {
            .bd-placeholder-img-lg {
                font-size: 3.5rem;
            }
        }
    </style>
    <!-- Custom styles for this template -->
    <link href="assets/css/floating-labels.css" rel="stylesheet">
</head>

<body>
    <form action="#" 
          class="form-signin"
          method="POST">

        <div class="form-label-group">
            <input type="text" name="inputDate" class="form-control" placeholder="YYYYMMDD" required autofocus>
            <label for="inputDate">YYYYMMDD</label>
        </div>

        <div class="form-label-group">
            <input type="password" name="inputPassword" class="form-control" placeholder="Password" required>
            <label for="inputPassword">Password</label>
        </div>


        <button name="process"
                class="btn btn-lg btn-primary btn-block" 
                type="submit">Submit</button>
        <p class="mt-5 mb-3 text-muted text-center">&copy; 2020</p>
    </form>
</body>

</html>