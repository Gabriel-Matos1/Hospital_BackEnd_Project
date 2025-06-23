package com.example.gabs.entidades;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;
import jakarta.persistence.Id;

@Entity
@Table(name = "PACIENTE")
public class paciente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;
    private String nome;
    private String convenio;
    private String nascimento;
    private String observacao;
    private int idade;

    // Constructor
    public paciente(String id, String nome, String convenio, String nascimento) {
        this.id = id;
        this.nome = nome;
        this.convenio = convenio;
        this.nascimento = nascimento;
    }

    // Getters y Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getnome() {
        return nome;
    }

    public void setnome(String nome) {
        this.nome = nome;
    }

    public String getconvenio() {
        return convenio;
    }

    public void setconvenio(String convenio) {
        this.convenio = convenio;
    }

    public String getnascimento() {
        return nascimento;
    }

    public void setnascimento(String nascimento) {
        this.nascimento = nascimento;
    }
    public String getobservacao() {
        return observacao;
    }       
    public void setobservacao(String observacao) {
        this.observacao = observacao;
    }
    public int getidade() {
        return idade;
    }
    public void setidade(int idade) {
        this.idade = idade; 
    }
}
