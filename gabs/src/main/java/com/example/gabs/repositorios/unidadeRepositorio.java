package com.example.gabs.repositorios;
import org.springframework.stereotype.Repository;

@Repository
public class unidadeRepositorio {
    
    public void guardarunidade(String nombre) {
    }

    public String buscarLocalizacaoUnidade(String id_unidade) {
        return "unidade encontrado";
    }

    public void eliminarunidade(String id_unidade) {
    } 
    public String listarunidades() {
        return "unidade encontrado";
    }    
    public String listarFuncionariosPorUnidade(String id_unidade) {
        return "unidade encontrado";
    }    
}
