package com.example.gabs.entidades;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name = "ALTERACAO_SISTEMICA")
public class alteracaoSistemica {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id_alteracao;
    private String observacao;
    private String autor;
    private String tipo_autor;
    private String id_procedimento_fk;


    
    public alteracaoSistemica(String id_alteracao, String observacao) {
        this.id_alteracao = id_alteracao;
        this.observacao = observacao;
    }

    public String getId_alteracao() {
        return id_alteracao;
    }

    public void setIdAlteracao(String id_alteracao) {
        this.id_alteracao = id_alteracao;
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
