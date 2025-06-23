package com.example.gabs.repositorios;
import org.springframework.stereotype.Repository;

@Repository
public class prontuarioRepositorio {
    
    public void guardarprontuario(String nombre) {
    }

    public String buscarprontuario(String id_procedimento) {
        return "prontuario encontrado";
    }

    public void eliminarprontuario(String id_prontuario) {
    } 
        
}
