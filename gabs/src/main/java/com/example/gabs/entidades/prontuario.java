package com.example.gabs.entidades;
import jakarta.persistence.Entity;


@Entity
public class prontuario {
    private String Id_prontuario;
    private String observacao;
    private String id_procedimento_fk;


    
    public prontuario(String Id_prontuario, String observacao) {
        this.Id_prontuario = Id_prontuario;
        this.observacao = observacao;
    }

    public String getId_prontuario() {
        return Id_prontuario;
    }

    public void setId_prontuario(String Id_prontuario) {
        this.Id_prontuario = Id_prontuario;
    }

    public String getobservacao() {
        return observacao;
    }

    public void setobservacao(String observacao) {
        this.observacao = observacao;
    }

    public String getid_procedimento_fk() {
        return id_procedimento_fk;
    }
    public void setid_procedimento_fk(String id_procedimento_fk) {
        this.id_procedimento_fk = id_procedimento_fk;   
    }

}
