<?php
class ApiModel extends CI_Model {

	public function searchSiswa($q){
		$this->db->where('NIS', $q);
		$result = $this->db->get('siswa')->result();
		return $result;
	}

	public function insertSiswa($dataSiswa){
		$val = array(
			'NIS'			=>$dataSiswa['NIS'],
			'nama'			=>$dataSiswa['nama'],
			'id_jurusan'	=>$dataSiswa['id_jurusan'],
			'jk'			=>$dataSiswa['jk'],
			'alamat'		=>$dataSiswa['alamat']
		);

		$insert = $this->db->insert('siswa', $val);

		if($insert){
			return true;
		} else {
			return false;
		}
	}

	public function updateSiswa($dataBaru, $nis){
		$val = array(
			"NIS"		=>$dataBaru['NIS'],
			"nama"		=>$dataBaru['nama'],
			"id_jurusan"=>$dataBaru['id_jurusan'],
			"jk"		=>$dataBaru['jk'],
			"alamat"	=>$dataBaru['alamat']
		);
		$this->db->where('NIS', $nis);
		$this->db->update('siswa', $val);
	}


	public function deleteSiswa($nis){
		
		$val = array(
			"NIS"=>$nis
		);

		return $this->db->delete("siswa", $val);
	}
}