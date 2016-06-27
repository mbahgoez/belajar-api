<?php
error_reporting(E_ALL);
header("Access-Control-Allow-Origin:*");

defined('BASEPATH') OR exit('No direct script access allowed');

class Siswa extends CI_Controller {

	public function __construct(){
		parent::__construct();
		$this->load->model('ApiModel');
	}

	public function index()
	{
		$this->load->view('welcome_message');
	}
	public function search($q){
		$data = $this->ApiModel->searchSiswa($q);
		echo json_encode($data);
	}

	public function tampilSemuaSiswa(){
		$data = $this->db->get('siswa')->result();

		$this->output->set_content_type('application/json')->set_output(json_encode($data, JSON_PRETTY_PRINT));
	}
	public function tampilSiswa($param1 = 1){
		$perpages = 6;
		$pages = ($param1-1)*$perpages;
		$data = $this->db->get("siswa", $perpages, $pages)->result();

		$this->output->set_content_type('application/json')->set_output(json_encode($data, JSON_PRETTY_PRINT));
	}
	public function saveSiswa(){
		$json = file_get_contents("php://input");
		$data = (array)json_decode($json);

		$insert =  $this->ApiModel->insertSiswa($data);

		if($insert){
			$result = array(
				"Status"=>"Succes",
				"Keterangan"=>"Berhasil Ditambahkan"
			);
		} else {
			$result = array(
				"Status"=>"Failed",
				"Keterangan"=>"Tidak Berhasil Ditambahkan"
			);
		}

		$this->output->set_content_type('application/json')->set_output(json_encode($result, JSON_PRETTY_PRINT));

	}
	// NIS,nama,id_jurusan,jk,alamat

	public function updateSiswa($nis){
		$json = file_get_contents("php://input");

		$data = (array)json_decode($json);

		$this->ApiModel->updateSiswa($data, $nis);

		$result = array(
			"Status"=>"Success",
			"Keterangan"=>"Berhasil Diperbarui"
		);

		$this->output->set_content_type('application/json')->set_output(json_encode($result, JSON_PRETTY_PRINT));
	}


	public function deleteSiswa($nis){

		$this->ApiModel->deleteSiswa($nis);

		$result = array(
			"Status"=>"Success",
			"Keterangan"=>"Berhasil Dihapus"
		);

		$this->output->set_content_type('application/json')->set_output(json_encode($result, JSON_PRETTY_PRINT));
	}

	public function warteg(){
		$this->load->view("index.html");
	}
	public function urlsalah(){
		$result = array(
			"Status"=>"url not valid"
		);

		$this->output->set_content_type("application/json")->set_output(json_encode($result, JSON_PRETTY_PRINT));
	}

}
