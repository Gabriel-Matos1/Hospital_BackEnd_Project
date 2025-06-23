package com.example.gabs.entidades;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;
import jakarta.persistence.Id;


@Entity
@Table(name = "FUNCIONARIO")
public class funcionario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;
    private String tipo;
    private String nome;
    private String nascimento;
    private String id_unidade_fk;
    private int idade;

    public funcionario(String id, String tipo, String nome, String nascimento) {
        this.id = id;
        this.tipo = tipo;
        this.nome = nome;
        this.nascimento = nascimento;
    }


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String gettipo() {
        return tipo;
    }

    public void settipo(String tipo) {
        this.tipo = tipo;
    }

    public String getnome() {
        return nome;
    }

    public void setnome(String nome) {
        this.nome = nome;
    }

    public String getnascimento() {
        return nascimento;
    }

    public void setnascimento(String nascimento) {
        this.nascimento = nascimento;
    }
    public String getid_unidade_fk() {
        return id_unidade_fk;
    }       
    public void setid_unidade_fk(String id_unidade_fk) {
        this.id_unidade_fk = id_unidade_fk;
    }
    public int getidade() {
        return idade;
    }
    public void setidade(int idade) {
        this.idade = idade; 
    }
}
