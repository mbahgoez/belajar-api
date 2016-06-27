<?php
header("Access-Control-Allow-Origin:*");
header("Access-Control-Request-Method:GET, POST, PUT, DELETE");
header('Content-Type: application/json; charset=utf-8');

class Pesan extends CI_Controller {

  public function __construct(){
    parent::__construct();
  }
  public function tampilPesan(){
    $data = $this->db->get("pesan")->result();
    $this->output->set_content_type("application/json")->set_output(json_encode($data, JSON_PRETTY_PRINT));
  }
  public function insertPesan(){
    $json_data = file_get_contents("php://input");
    $array_data = (array)json_decode($json_data);

    $val = array(
      "pesanan"=>$array_data['pesanan'],
      "nama_pemesan"=>$array_data['nama_pemesan']
    );


    $query = $this->db->insert("pesan", $val);

    if($query){
      
      $this->db->limit(1);
      $this->db->order_by("id_pesan", "DESC");
      $status = $this->db->get("pesan")->result();


      $this->output->set_content_type("application/json")->set_output(json_encode($status, JSON_PRETTY_PRINT));
    } else {
      $status =  array(
        "status"=>"gagal"
      );

      $this->output->set_content_type("application/json")->set_output(json_encode($status, JSON_PRETTY_PRINT));
    }

  }
  public function updatePesan($id){
    $json_data = file_get_contents("php://input");
    $array_data = (array)json_decode($json_data);

    $val = array(
      "pesanan"=>$array_data['pesanan'],
      "nama_pemesan"=>$array_data['nama_pemesan']
    );

    $this->db->where("id_pesan", $id);
    $query = $this->db->update("pesan", $val);

    if($query){
      echo json_encode($val);
    } else {
      $status = array(
        "status"=>"fail"
      );

      echo json_encode($status);
    }
  }
  public function hapusPesan($id){
    $val = array(
      "id_pesan"=>$id
    );
    $query = $this->db->delete("pesan", $val);

    if($query){
      $status = array(
        "status"=>"success"
      );
      $data = json_encode($status);
      echo isset($_GET['callback']) ? "{$_GET['callback']}($data)" : $data;
    } else {
      $status = array(
        "status"=>"fail"
      );
      $data = json_encode($status);
      echo isset($_GET['callback']) ? "{$_GET['callback']}($data)" : $data;
    }
  }
}
