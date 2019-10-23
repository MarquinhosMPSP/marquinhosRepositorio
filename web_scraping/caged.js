const caged = async (browser, cnpj, pispasep) => {
  console.log("entrou caged");

  let url =
    "http://ec2-18-231-116-58.sa-east-1.compute.amazonaws.com/caged/login.html";

  let page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: "networkidle2" });

    await page.type("#username", "login");
    await page.type("#password", "senha");
    const inputSubmit = 'input[type="submit"]';
    await page.click(inputSubmit);
    const dropDown = 'a[class="raiz"]';
    var optionClick = "#j_idt12\\:idMenuLinkAutorizado";

    //extração página Autorizado/Responsável
    await page.waitForSelector(dropDown);
    await page.hover(dropDown);
    await page.waitForSelector(optionClick);
    await page.click(optionClick);
    await page.waitForSelector(
      "#formPesquisarAutorizado\\:txtChavePesquisaAutorizado014"
    );
    await page.type(
      "#formPesquisarAutorizado\\:txtChavePesquisaAutorizado014",
      String(cnpj)
    );
    await page.click(inputSubmit);
    await page.waitForSelector("#conteudo > fieldset:nth-child(4)");
    var autorizado_responsavel = await page.evaluate(() => {
      var data = {
        cnpj_cpf_cei: document.querySelector("#txCnpj020_2").innerHTML,
        razao_social: document.querySelector("#txtrazaosocial020_4").innerHTML,
        logradouro: document.querySelector("#txt3_logradouro020").innerHTML,
        bairro: document.querySelector("#txt4_bairro020").innerHTML,
        municipio: document.querySelector(
          "#conteudo > fieldset:nth-child(6) > div:nth-child(4) > div > div.coluna_2NCheia"
        ).innerText,
        uf: document.querySelector("#txt7_uf020").innerHTML,
        cep: document.querySelector("#txt8_cep020").innerHTML,
        nome: document.querySelector("#txt_nome_contato").innerHTML,
        cpf: document.querySelector("#txt_contato_cpf").innerHTML,
        telefone: document.querySelector(
          "#conteudo > fieldset:nth-child(7) > div:nth-child(4) > div.coluna_3 > div.coluna_2n"
        ).innerText,
        ramal: document.querySelector("#txt10_ramal020").innerText,
        email: document.querySelector("#txt11_email").innerHTML
      };
      return data;
    });

    //extração página Empresa
    optionClick = "#j_idt12\\:idMenuLinkEmpresaCaged";
    await page.waitForSelector(dropDown);
    await page.hover(dropDown);
    await page.waitForSelector(optionClick);
    await page.click(optionClick);
    await page.waitForSelector("#formPesquisarEmpresaCAGED\\:txtcnpjRaiz");
    await page.type("#formPesquisarEmpresaCAGED\\:txtcnpjRaiz", String(cnpj));
    await page.click(inputSubmit);
    await page.waitForSelector("#formResumoEmpresaCaged\\:txtRazaoSocial");
    var empresa = await page.evaluate(() => {
      var data = {
        atividade_economica_cnae: document.querySelector(
          "#formResumoEmpresaCaged > fieldset:nth-child(2) > div:nth-child(4) > div > div.coluna_2NCheia"
        ).innerText,
        totais: {
          numero_filiais: document.querySelector(
            "#formResumoEmpresaCaged\\:txtNumFiliais"
          ).innerHTML,
          admissoes: document.querySelector(
            "#formResumoEmpresaCaged\\:txtTotalNumAdmissoes"
          ).innerHTML,
          variacao_absoluta: document.querySelector(
            "#formResumoEmpresaCaged\\:txtTotalVariacaoAbosulta"
          ).innerHTML,
          total_vinculos: document.querySelector(
            "#formResumoEmpresaCaged\\:txtTotalVinculos"
          ).innerHTML,
          desligamentos: document.querySelector(
            "#formResumoEmpresaCaged\\:txtTotalNumDesligamentos"
          ).innerHTML,
          primeiro_dia: document.querySelector(
            "#formResumoEmpresaCaged\\:txtTotalNumPrimDia"
          ).innerHTML,
          ultimo_dia: document.querySelector(
            "#formResumoEmpresaCaged\\:txtTotalNumUltDia"
          ).innerHTML
        }
      };
      return data;
    });

    //extração página Trabalhador
    optionClick = "#j_idt12\\:idMenuLinkTrabalhador";
    await page.waitForSelector(dropDown);
    await page.hover(dropDown);
    await page.click(optionClick);
    var seletor = "#formPesquisarTrabalhador\\:slctTipoPesquisaTrabalhador";
    await page.waitForSelector(seletor);
    await page.evaluate(seletor => {
      var listOptions = Array.from(document.querySelector(seletor).options).map(
        option => option.innerHTML
      );
      document.querySelector(seletor).selectedIndex = listOptions.indexOf(
        "PIS/PASEP"
      );
    }, seletor);
    await page.type(
      "#formPesquisarTrabalhador\\:txtChavePesquisa",
      String(pispasep)
    );
    await page.click(inputSubmit);
    await page.waitForSelector("#txt2_Nome027");
    var trabalhador = await page.evaluate(() => {
      var listVinculos = Array.from(
        document.querySelectorAll(
          "#HistoricoMov_Trabalhador_2\\:panelTabbedPane_resumo_trabalhador_2\\:movimentos_rais_caged_4\\:mov_rais_cage\\:tbody_element > tr"
        )
      );
      var vinculos_trabalhador = [];
      listVinculos.forEach(tr => {
        var data = {
          fonte: tr.children[0].innerText,
          razao_social: tr.children[1].innerText,
          cnpj: tr.children[2].innerText,
          cei: tr.children[3].innerText,
          entrada: tr.children[4].innerText,
          saida: tr.children[5].innerText,
          situacao: tr.children[6].innerText
        };
        vinculos_trabalhador.push(data);
      });
      var data = {
        nome: document.querySelector("#txt2_Nome027").innerHTML,
        pis_base: document.querySelector("#txt1_Pis028").innerHTML,
        cpf: document.querySelector("#txt3_Cpf027").innerHTML,
        ctps: document.querySelector("#txt5_Ctps027").innerHTML,
        situacao_pis: document.querySelector("#txt4_SitPis027").innerHTML,
        nacionalidade: document.querySelector(
          "#conteudo > fieldset:nth-child(9) > div:nth-child(5) > div.coluna_3 > div.coluna_2n"
        ).innerText,
        grau_de_instrucao: document.querySelector(
          "#conteudo > fieldset:nth-child(9) > div:nth-child(6) > div > div.coluna_2NCheia"
        ).innerText,
        pcd: document.querySelector("#txt13_Def027").innerHTML,
        data_nascimento: document.querySelector("#txt4_datanasc027"),
        sexo: document.querySelector("#txt6_Sexo027").innerHTML,
        raca: document.querySelector(
          "#conteudo > fieldset:nth-child(9) > div:nth-child(5) > div.coluna_4 > div.coluna_2n"
        ).innerText,
        tempo_trabalho: {
          caged: document.querySelector("#txt26_Caged027").innerHTML,
          rais: document.querySelector("#txt27_Rais027").innerHTML
        },
        vinculos_trabalhador
      };
      return data;
    });
    var data = {
      autorizado_responsavel,
      empresa,
      trabalhador
    };
    await page.close();
    return Object.assign(data, { successCaged: true });
  } catch (error) {
    console.log(error);
    await page.close();
    return { errorCaged: true };
  }
};

module.exports = caged;
