package com.example.gabs.repositorios;
import org.springframework.stereotype.Repository;

@Repository
public class pacienteRepositorio {
    
    public void guardarPaciente(String nombre) {
    }

    public String buscarPaciente(String id) {
        return "Paciente encontrado";
    }

    public void eliminarPaciente(String id) {
    } 
        
}
