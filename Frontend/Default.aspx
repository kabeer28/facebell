<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="FaceBell.Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>FACEBELL</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="default.js" type="text/javascript"></script>
    <link href="styles/default.css" type="text/css" rel="stylesheet" />
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <div class="image-holder">
                <img class="image1" src="styles/hexagon.jpg" />
            </div>

            <div class="login">

                <div class="header-holder">
                    <h1>Hello! Let's get started</h1>
                </div>

                <div class="input-holder">
                    <input type="text" class="textbox" placeholder="EMAIL" required/>
                    <input type="text" class="textbox" placeholder="USERNAME" required/>
                    <input type="password" class="textbox" placeholder="PASSWORD" required/>
                </div>

                <div class="checkbox-holder">
                    <input class="checkbox" type="checkbox" id="agree"/>
                    <label for="accept">I READ AND AGREE TO THE TERMS AND SERVICES</label><br />
                    <input class="checkbox" type="checkbox" id="optin"/>
                    <label for="optin">OPT IN FOR EMAIL UPDATES</label><br />
                </div>

                <div class="button-holder">
                    <input class="button" type="button" value="SIGN UP" />
                </div>

            </div>
        </div>
    </form>
</body>
</html>
