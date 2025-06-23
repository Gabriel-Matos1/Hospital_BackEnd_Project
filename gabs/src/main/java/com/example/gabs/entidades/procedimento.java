package com.example.gabs.entidades;
import jakarta.persistence.Entity;


@Entity
public class procedimento   {
    private String id;
    private String cpf_paciente_FK;
    private String cpf_funcionario_FK;
    private String tipo_procedimento;
    private String data_horario;
    private String status_procedimento;
    private String id_protuario_FK;

    
    public procedimento(String id, String cpf_paciente_FK) {
        this.id = id;
        this.cpf_paciente_FK = cpf_paciente_FK;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getcpf_paciente_FK() {
        return cpf_paciente_FK;
    }

    public void setcpf_paciente_FK(String cpf_paciente_FK) {
        this.cpf_paciente_FK = cpf_paciente_FK;
    }
    public String getcpf_funcionario_FK() {
        return cpf_funcionario_FK;
    }
    public void setcpf_funcionario_FK(String cpf_funcionario_FK) {
        this.cpf_funcionario_FK = cpf_funcionario_FK;
    }
    public String gettipo_procedimento() {
        return tipo_procedimento;
    }
    public void settipo_procedimento(String tipo_procedimento) {
        this.tipo_procedimento = tipo_procedimento;   
    }
    public String getdata_horario() {
        return data_horario;
    }
    public void setdata_horario(String data_horario) {
        this.data_horario = data_horario;   
    }

    public String getstatus_procedimento() {
        return status_procedimento;
    }
    public void setstatus_procedimento(String status_procedimento) {
        this.status_procedimento = status_procedimento; 
    }
    public String getid_protuario_FK() {
        return id_protuario_FK;
    }
    public void setid_protuario_FK(String id_protuario_FK) {
        this.id_protuario_FK = id_protuario_FK;
    }
    
}
