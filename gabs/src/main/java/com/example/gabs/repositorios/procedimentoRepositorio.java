package com.example.gabs.repositorios;
import org.springframework.stereotype.Repository;

@Repository
public class procedimentoRepositorio {
    
    public void guardarprocedimento(String nombre) {
    }

    public String buscarprocedimento(String id) {
        return "procedimento encontrado";
    }

    public void eliminarprocedimento(String id) {
    } 
        
    public String buscarprocedimentoPorPaciente(String id) {
        return "procedimento encontrado";
    }
    public String buscarprocedimentoPorFuncionario(String id) {
        return "procedimento encontrado";
    }
/*    public List<Procedimento> buscarProcedimentosEntreDatas(String data_hora, String data_hora2) {
        Procedimento p1 = new Procedimento();
        p1.setNome("Limpeza");
        p1.setData("2025-06-23");

        return List.of(p1);
    }
 */
    public String buscarprocedimentoPorProntuario(String id) {
        return "procedimento encontrado";
    }
}
