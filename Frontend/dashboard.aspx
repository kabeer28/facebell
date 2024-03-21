<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="dashboard.aspx.cs" Inherits="FaceBell.dashboard" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>FACEBELL - DASHBOARD</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="dashboard.js" type="text/javascript"></script>
    <script src="https://kit.fontawesome.com/d0ae8a3991.js" crossorigin="anonymous"></script>
    <link href="styles/dashboard.css" type="text/css" rel="stylesheet" />
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <div class="menu">

                <div class="title">

                    <h1 class="header">FACEBELL</h1>
                    <p class="text">12:17 PM</p>

                </div>

                <div class="item-holder">

                    <a class="item">DASHBOARD</a>
                    <a class="item">FRIENDS</a>
                    <a class="item">HELP</a>
                    <a class="item"><i class="fa-solid fa-gear"></i></a>


                </div>

            </div>

            <div class="section">

                <div class="part">
                    <h2>RECENT ACTIVITY</h2>
                    <div class="row">
                        <p class="person">KABEER MAKKAR RANG YOUR DOORBELL</p>
                        <p class="time">02/08/2024 12:58PM</p>
                    </div>
                    <div class="row">
                        <p class="person">IAN BOWDEN RAND YOUR DOORBELL</p>
                        <p class="time">02/08/2024 11:43AM</p>
                    </div>
                    <div class="row">
                        <p class="person"><span style="font-weight: 700;">UNKNOWN&nbsp</span> RANG YOUR DOORBELL</p>
                        <p class="time">02/08/2024 11:38AM</p>
                    </div>
                    <div class="row">
                        <p class="person">SIVAN XU RAND YOUR DOORBELL</p>
                        <p class="time">02/07/2024 10:37PM</p>
                    </div>
                    <div class="row">
                        <p class="person">DECLAN SMITH RANG YOUR DOORBELL</p>
                        <p class="time">02/07/2024 10:00PM</p>
                    </div>
                    <div class="row">
                        <p class="person">SIVAN XU RANG YOUR DOORBELL</p>
                        <p class="time">02/07/2024 10:07PM</p>
                    </div>
                </div>
                <div class="part">
                   <iframe width="100%" height="310" src="https://www.youtube.com/embed/_NYGYAv56LU?si=RjKE2GxbmUnp9JK6" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>                </div>
                <div class="part">
                    <h2>MOST VISITED THIS WEEK</h2>
                    <div class="row">
                        <p class="person">KABEER MAKKAR</p>
                        <p class="time">17</p>
                    </div>
                    <div class="row">
                        <p class="person">IAN BOWDEN</p>
                        <p class="time">12</p>
                    </div>
                    <div class="row">
                        <p class="person">DECLAN SMITH</p>
                        <p class="time">9</p>
                    </div>
                    <div class="row">
                        <p class="person">SIVAN XU</p>
                        <p class="time">5</p>
                    </div>
                    <div class="row">
                        <p class="person">ARSHIA SHIRANIAN</p>
                        <p class="time">3</p>
                    </div>
                </div>
                <div class="part">
                    <img class="image" src="styles/arsh.jpeg"/>
                    <h1><span style="font-weight:800;font-size:60px">ALERT</span><br />ARSHIA SHIRANIAN IS AT THE DOOR</h1>
                </div>

            </div>
        </div>
    </form>
</body>
</html>
