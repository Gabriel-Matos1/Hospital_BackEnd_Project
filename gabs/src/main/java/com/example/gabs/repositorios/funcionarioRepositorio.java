package com.example.gabs.repositorios;
import org.springframework.stereotype.Repository;

@Repository
public class funcionarioRepositorio {
    
    public void guardarfuncionario(String nombre) {
    }

    public String buscarfuncionario(String id) {
        return "funcionario encontrado";
    }

    public void eliminarfuncionario(String id) {
    } 
        
}
