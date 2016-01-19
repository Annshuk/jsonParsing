<?PHP
######################################################
#                                                    #
#                Forms To Go 3.2.1                   #
#             http://www.bebosoft.com/               #
#                                                    #
######################################################



DEFINE('kOptional', true);
DEFINE('kMandatory', false);




error_reporting(E_ERROR | E_WARNING | E_PARSE);
ini_set('track_errors', true);

function DoStripSlashes($FieldValue) 
{ 
 if ( get_magic_quotes_gpc() ) { 
  if (is_array($FieldValue) ) { 
   return array_map('DoStripSlashes', $FieldValue); 
  } else { 
   return stripslashes($FieldValue); 
  } 
 } else { 
  return $FieldValue; 
 } 
}

#----------
# FilterCChars:

function FilterCChars($TheString)
{
 return preg_replace('/[\x00-\x1F]/', '', $TheString);
}

#----------
# Validate: Email

function check_email($email, $optional)
{
 if ( (strlen($email) == 0) && ($optional === kOptional) ) {
  return true;
 } elseif ( eregi("^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$", $email) ) {
  return true;
 } else {
  return false;
 }
}



if (isset($_SERVER['HTTP_X_FORWARDED_FOR'])) {
 $ClientIP = $_SERVER['HTTP_X_FORWARDED_FOR'];
} else {
 $ClientIP = $_SERVER['REMOTE_ADDR'];
}

$FTGname = DoStripSlashes( $_REQUEST['name'] );
$FTGmob = DoStripSlashes( $_REQUEST['mob'] );
$FTGemailid = DoStripSlashes( $_REQUEST['emailid'] );
$FTGenquiry = DoStripSlashes( $_REQUEST['enquiry'] );
$FTGbutton = DoStripSlashes( $_REQUEST['button'] );
$FTGbutton2 = DoStripSlashes( $_REQUEST['button2'] );


# Fields Validations

$ValidationFailed = false;

if (!check_email($FTGemailid, kMandatory)) {
 $ValidationFailed = true;
}


# Redirect user to the error page

if ($ValidationFailed === true) {

 header("Location: index.html");
 exit;

}
# Email to Form Owner

$emailSubject = FilterCChars("IDEE Enquiry");

$emailBody = "name : $FTGname\n"
 . "mob : $FTGmob\n"
 . "emailid : $FTGemailid\n"
 . "enquiry : $FTGenquiry\n"
 . "";
 $emailTo = 'info@ronakoptik.com';
  
 $emailFrom = FilterCChars("$FTGemailid");
  
 $emailHeader = "From: $emailFrom\n"
  . "MIME-Version: 1.0\n"
  . "Content-type: text/plain; charset=\"ISO-8859-1\"\n"
  . "Content-transfer-encoding: 8bit\n";
  
 mail($emailTo, $emailSubject, $emailBody, $emailHeader);


# Redirect user to success page

header("Location: thanks.html");
exit;
?>