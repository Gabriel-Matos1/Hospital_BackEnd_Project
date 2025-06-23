package com.example.gabs.entidades;
import jakarta.persistence.Entity;


@Entity
public class alteracaoSistemica {
    private String id;
    private String observacao;
    private String autor;
    private String tipo_autor;
    private String id_procedimento_fk;


    
    public alteracaoSistemica(String id, String observacao) {
        this.id = id;
        this.observacao = observacao;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getobservacao() {
        return observacao;
    }

    public void setobservacao(String observacao) {
        this.observacao = observacao;
    }
    public String getautor() {
        return autor;
    }
    public void setautor(String autor) {
        this.autor = autor;
    }
    public String gettipo_autor() {
        return tipo_autor;
    }
    public void settipo_autor(String tipo_autor) {
        this.tipo_autor = tipo_autor;   
    }
    public String getid_procedimento_fk() {
        return id_procedimento_fk;
    }
    public void setid_procedimento_fk(String id_procedimento_fk) {
        this.id_procedimento_fk = id_procedimento_fk;   
    }

}
