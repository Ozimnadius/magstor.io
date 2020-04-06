<?php
header('Content-Type: application/json');

$data = $_POST;
$action = $data['action'];
switch ($action) {
    case 'callback':
        echo json_encode(array(
            'status' => true,
            'html' => getCallbackForm()
        ));
        exit();
        break;
    case 'callbackSubmit':
        echo json_encode(array(
            'status' => true,
            'html' => getCallbackSubmitForm()
        ));
        exit();
        break;
    default:
        echo json_encode(array(
            'status' => false,
        ));
        exit();
        break;
}

function getCallbackForm()
{
    ob_start();
    ?>

    <?
    $html = ob_get_contents();
    ob_end_clean();
    return $html;
}

function getCallbackSubmitForm()
{
    ob_start();
    ?>

    <?
    $html = ob_get_contents();
    ob_end_clean();
    return $html;
}

?>