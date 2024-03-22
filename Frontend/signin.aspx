<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" type="text/css" href="styles.css">

<button class="open-button" onclick="openForm()">Open Form</button>

<div class="welcome-back-popup" id="myForm">
    <form action="/action_page.php" class="form-container">
      <h1>Welcome Back!</h1>
  <div class="form-group">
    <input type="text" placeholder="Email" name="email" required>
  </div>
  <div class="form-group">
    <input type="password" placeholder="Password" name="psw" required>
  </div>
  <div class="form-group">
  </div>
      <button type="submit" class="btn">Sign in</button>
      <button type="button" class="btn cancel" onclick="closeForm()">Close</button>
    </form>
  </div>

  <script src="script.js"></script>

</body>
</html>