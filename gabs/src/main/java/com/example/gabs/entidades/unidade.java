package com.example.gabs.entidades;
import jakarta.persistence.Entity;


@Entity
public class unidade {
    private String id;
    private String localizacao;


    public unidade(String id, String localizacao) {
        this.id = id;
        this.localizacao = localizacao;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getlocalizacao() {
        return localizacao;
    }

    public void setlocalizacao(String localizacao) {
        this.localizacao = localizacao;
    }

}
