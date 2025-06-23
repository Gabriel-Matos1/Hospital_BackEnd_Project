package com.example.gabs.controler;

//import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PutMapping;
//import com.example.gabs.entidades.procedimento; // Certifique-se de que o caminho do pacote está correto


@RestController
public class ControllerPrincipal {

/*    @GetMapping("/")
     public List <procedimento> index(@RequestParam String data1, @RequestParam String data2) {
        List <procedimento> Procedimentos = buscarProcedimentosEntreDatas(data1, data2);
        return Procedimentos;
    }
    public List<Consulta> buscarProcedimentosEntreDatas(String data1, String data2) {
        // Simulação da busca — substitua com sua lógica real
        return List.of(); // Retorna lista vazia por enquanto
    }
*/

    @GetMapping("/paciente")
    public String paciente() {

        return "retornar a pagina com os dados dos paciente";
    }
    @GetMapping("/unidade")
    public String unidade() {
        return "retornar a pagina com os dados das unidade";
    }
    @GetMapping("/funcionario")
    public String funcionario() {
        return "retornar a pagina com os dados dos funcionarios";
    }
    @GetMapping("/alteracaoSistemica")
    public String alteracaoSistemica() {
        return "retornar a pagina com os dados das alteracoes sistemicas";  
    }
    @GetMapping("/procedimento")
    public String procedimento() {
        return "retornar a pagina com os dados dos procedimentos";
    }
    @GetMapping("/prontuario")
    public String prontuario() {
        return "retornar a pagina com os dados dos prontuarios";
    }
 
    @PutMapping("/paciente/cadastrar")
    public String cadastrarPaciente() {
        return "cadastrar paciente";
    }
 
    @PutMapping("/funcionario/cadastrar")
    public String cadastrarFuncionario() {
        return "cadastrar Funcionario";
    }
 
    @PutMapping("/unidade/cadastrar")
    public String cadastrarUnidade() {
        return "cadastrar Unidade";
    }
 
    @PutMapping("/procedimento/novo")
    public String novoProcedimento() {
        return "cadastrar Unidade";
    }
}
