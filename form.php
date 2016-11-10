<?php
 /* Здесь проверяется существование переменных */
  if (isset($_POST['contact_name'])) {$contact_name = $_POST['contact_name'];}
 if (isset($_POST['contact_tel'])) {$contact_tel = $_POST['contact_tel'];}
 if (isset($_POST['product'])) {$product= $_POST['product'];}

/* Сюда впишите свою эл. почту */
 $address = "web5@progressm.spb.ru,colorkid@yandex.ru,pogorelskayae@progressm.spb.ru,web_dev@progressm.spb.ru,web_2@progressm.spb.ru,makarovaa@progressm.spb.ru,salnikovmaxim@gmail.com";

/* А здесь прописывается текст сообщения, \n - перенос строки */
 $mes = "nproduct: $product\nТелефон: $contact_tel\nИмя: $contact_name";

/* А эта функция как раз занимается отправкой письма на указанный вами email */
$sub='Заказ с сайта - moyki.magazin-m.ru'; //сабж
$email='<moyki.magazin-m.ru>'; // от кого
 $send = mail ($address,$sub,$mes,"Content-type:text/plain; charset = utf-8\r\nFrom:$email");

ini_set('short_open_tag', 'On');
header('Refresh: 3; URL=index.html');
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="refresh" content="3; url=index.html">
<title>С вами свяжутся</title>
<meta name="generator">
<style type="text/css">
body
{
   
   background: #009688 url(img/zakaz.jpg) top -70% center no-repeat;
   
}

<script type="text/javascript">
setTimeout('location.replace("/index.html")', 3000);
/*Изменить текущий адрес страницы через 3 секунды (3000 миллисекунд)*/
</script> 
</head>
</body>
</html>