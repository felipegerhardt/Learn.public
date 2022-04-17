import React, { createContext, useState ,useEffect } from 'react';
import { collection, doc, setDoc, getFirestore, getDoc, query, where, orderBy, limit, getDocs } from "firebase/firestore"; 
import { signInWithEmailAndPassword, 
        getAuth, 
        sendPasswordResetEmail, 
        createUserWithEmailAndPassword, 
        updateProfile,
        signOut} from 'firebase/auth';
import {Alert, ToastAndroid} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({});

function AuthProvider({ children }){

    
    // Sempre que o app for aberto esse useEffect rodará
    useEffect(() => { 
        
        // Função para extrair os dados do AsyncStorage
        async function getData() {

            // Booleano para indicar busca de dados no AsyncStorage
            setLoadingAuth(true);
            
            // Tenta pegar os dados do AsyncStorage
            try{
                const dadosAsync = JSON.parse(await AsyncStorage.getItem('L-earn'));
                if (!!dadosAsync){
                    //console.log(dadosAsync)

                    // Seta os dados na variável dados
                    setDados(dadosAsync);
                };
            }catch(erro){

                console.log('Erro em getData: ' + erro)
                
            };
        };

        // Chama a função assíncrona com a promise na variável valor 
        getData().then((valor) => {

           // Booleano para indicar busca de dados no AsyncStorage
           setLoadingAuth(false);

        }).catch((error) => {

            console.log('Erro em getData' + error)
        });

    }, []);

    // Constante para armazenar a categoria selecionada nos botões
    const [categoria, setCategoria] = useState(null);

    // Booleano para renderizar a tela branca com Activity Indicator
    const [loadingAuth, setLoadingAuth] = useState(false);

    // Booleano para renderizar o Activity Indicator da TelaCadastro
    const [loading, setLoading] = useState(false);   

    // Constante para armazenar estado da segunda parte da TelaCadastro
    const [form, setForm] = useState(false);

    // Variável para solicitação de aula
    const [aula, setAula] = useState(false);

    // Função para renderizar segunda parte da TelaCadastro
    function SwitchState() {
        setForm(!form);
    };

    // Constante que contém as tags 
    // Atualizar a constante na nuvem a cada click? - Pode gerar tráfego de dados desnecessários
    const [tagsAvancadas, setTagsAvancadas] = useState([]);

    // Constate que existe para armazenar os dados no momento de cadastro
    const [dados, setDados] = useState(null);
    const [uid, setUid] = useState(null);

    // Instanciando o Firestore
    const db = getFirestore();

    // Função para conectar o Front-End ao Firebase (criar usuário)
    async function cadastrarFirebase(nome, email, senha, senhaConf) {

        // Se as senhas conferirem
        // (TO-DO) Criar alertas para os erros mais recorrentes (quais são?)
        if (senha === senhaConf){

            if(senha === ""){

                Alert.alert(
                    "Sem senha é complicado",
                    "Proteja sua conta",
                    [
                        { text: "OK", onPress: () => null }
                    ]
                );

            }else{

                if(nome === ""){

                    Alert.alert(
                        "Você tem um nome, não tem?",
                        "Não seja tímido :)",
                        [
                            { text: "OK", onPress: () => null }
                        ]
                    );
                
                }else{
    
                // Aqui estão os fetchs vindos do Firebase
                const auth = getAuth();
                
                setLoading(true);
                
                // (TO-DO) Preciso do ActivityIndicator - Talvez exista um método do tipo .while(alguma coisa acontece enquanto carrega)
                createUserWithEmailAndPassword(auth, email, senha).then((userCredential) => {
    
                    // Abaixo estão as operações que serão feitas após a criação do usuário
                    const user = userCredential.user;
                    
                    setLoading(false);
    
                    // Atualiza o nome do usuário
                    updateProfile(auth.currentUser, {
                        displayName: nome
                    }).then(() => {

                        setUid(auth.currentUser.uid);

                    }).catch((error) => {
                        
                        const errorCode = error.code;
                        const errorMessage = error.message;

                    });
    
                    SwitchState(!form);
                    
                    // Essa expressão pega o erro do createUserWithEmailandPassword
                    }).catch((error) => {
    
                        const errorCode = error.code;
                        const errorMessage = error.message;
    
                        console.log("Erro em createUserWithEmailandPassword: " + errorCode, errorMessage)
                        
                        setLoading(false);
                        
                        // Tratar tipos de erros mais comuns
                        if (errorCode === "auth/invalid-password"){
                            
                            Alert.alert(
                                "As senhas não estão batendo",
                                "Repita com atenção",
                                [
                                    { text: "OK", onPress: () => null }
                                ]
                            );
                        };

                        if (errorCode === "auth/weak-password"){
                            
                            Alert.alert(
                                "A senha deve ter no mínimo 6 caracteres",
                                "Coloque números e símbolos :)",
                                [
                                    { text: "OK", onPress: () => null }
                                ]
                            );
                        };
    
                        if (errorCode === "auth/email-already-in-use"){
                            
                            Alert.alert(
                                "Este e-mail já existe",
                                "Tente outro e-mail dessa vez",
                                [
                                    { text: "OK", onPress: () => null }
                                ]
                            );
                        };
    
                        if (errorCode === "auth/invalid-email"){
                            
                            Alert.alert(
                                "Este e-mail é inválido",
                                "Tente de novo",
                                [
                                    { text: "OK", onPress: () => null }
                                ]
                            );
                        };       
                        
                        if (errorCode === "auth/admin-restricted-operation"){
                            
                            Alert.alert(
                                "Nenhuma informação?",
                                "É só preencher os campos",
                                [
                                    { text: "OK", onPress: () => null }
                                ]
                            );
                        };    
                        
                        if (errorCode ==="auth/internal-error"){
                            Alert.alert(
                                "Algo está errado",
                                "Confira as informações",
                                [
                                    { text: "OK", onPress: () => null }
                                ]
                            );
                        };
                        
    
                    }); 
                    
    
                };
                

            };
        }else{

            Alert.alert(
                "Senhas não conferem",
                "Repita com atenção dessa vez hein",
                [
                    { text: "OK", onPress: () => null }
                ]
            );
    
            
        };

    };
 
    // Função para cadastrar informações na UID do usuário na Firestore
    async function cadastrarUsuarioFirestore(nome, uid, email, categoria, escolaridade, disciplina, materia){
        
        // Preferências padrão'
        const notificacoes = {
            mostrar_notificacoes: true,
            mostrar_indicador_no_icone_dos_apps: true,
            notificacoes_flutuantes: true,
            notificacoes_na_tela_de_bloqueio: true,
            permitir_som: true,
            permitir_vibracao: true,
            solicitacoes_de_aula: true,
            novos_posts: true,
            atualizacoes_da_conta: true,

        };

        const seguranca = {
            mostrar_notificacoes: true,
            mostrar_indicador_no_icone_dos_apps: true,
            notificacoes_flutuantes: true,
            notificacoes_na_tela_de_bloqueio: true,
            permitir_som: true,
            permitir_vibracao: true,

        };


        setLoadingAuth(true);
    

        // Atualiza a constante dados (apenas quando sai da função cadastrarUsuarioFirestore por algum motivo)
        setDados({
            basicos:{
                nome: nome,
                uid: uid,
                email: email, 
                categoria: categoria,
                escolaridade: escolaridade,
                disciplina: disciplina,
                materia: materia,
                resumo: "",
                premium: false
            },
            notificacoes: notificacoes,
            seguranca: seguranca,
            tags: {basicas: null, intermediarias: null, avancadas: null}
        });

        // Instancia a coleção users
        const usersRef = collection(db, 'users');

        // Cria os documentos e coleções padrões para o usuário        
        setDoc(doc(usersRef, uid), {
            nome: nome,
            uid: uid,
            email: email,
            categoria: categoria,
            escolaridade: escolaridade,
            disciplina: disciplina,
            materia: materia, 
            premium: false
        })
        .then(() => {
                
            // Para criar documentos e inserir campos é só ir concatenando o caminho dentro de doc() depois colocar o objeto
            
            setDoc(doc(usersRef, uid, 'preferencias', 'notificacoes'), notificacoes);
            setDoc(doc(usersRef, uid, 'preferencias', 'seguranca'), seguranca);
            
            setLoadingAuth(false);
            
        })
        .catch((error) => {

            console.log('Erro em cadastrarUsuarioFirestore: ' + error)

        }
        );
        
            

    };

    // Função para fazer login no Firebase
    async function logarFirebase(email, senha, navigation){

        // Limpa quaisquer dados 
        AsyncStorage.clear()
        .then( ( ) => {

        }).catch((error) => {

            console.log("Erro em Logout: " + error)
        });

        setLoading(true);

        const auth = getAuth();

        await signInWithEmailAndPassword(auth, email, senha)
        .then( async (userCredential) => {

            console.log('Entrou no .then do signInWithEmailAndPassword')

            // Pegar o UID do usuário            
            const uid = userCredential.user.uid;

            // Instância com informações básicas do usuário
            const userDocsRef = doc(db, 'users', uid);

            // Consulta os dados básicos de um usuário e insere dentro da variável dados
            const dadosUser = await getDoc(userDocsRef);
                
            // Armazena os dados básicos do usuário na constante
            const dadosFirestore = dadosUser.data();

            if (dadosFirestore.primeiroacesso) {
                const usersRef = collection(db, 'users');
                setDoc(doc(usersRef, uid), {
                    primeiroacesso: false
                }, {merge: true})
            };

            // Instância com a coleção de preferências 
            const userPrefs = collection(db, 'users/'+ String(uid) + '/' + 'preferencias');

            // Instância com o documento de notificações dentro de preferências
            const userPrefsNot = doc(userPrefs, 'notificacoes');

            // Instância com o documento de segurança dentro de preferências
            const userPrefsSeg = doc(userPrefs, 'seguranca');

            // BUSCANDO TAGS APÓS REESTRUTURAÇÃO DE DADOS
            const userTags = collection(db, 'users/');

            // Instância com as coleções de tags 
            const userTagsAvancadas = collection(db, 'users/' + String(uid) + '/tags_avancadas');
            const userTagsIntermediarias =  collection(db, 'users/' + String(uid) + '/tags_intermediarias');
            const userTagsBasicas =  collection(db, 'users/' + String(uid) + '/tags_basicas');

            // Instância com documentos de cada coleção
            const tagsAv = await getDocs(userTagsAvancadas);
            const tagsInt = await getDocs(userTagsIntermediarias);
            const tagsBas= await getDocs(userTagsBasicas);

            // Variáveis para inserção de dados de tags
            let arr_av = {}
            let arr_int = {}
            let arr_bas = {}

            // Métodos forEach para ler os documentos de tags
            tagsAv.forEach((doc) => {

                arr_av[doc.id] = doc.data();
            
            });
            tagsInt.forEach((doc) => {

                arr_int[doc.id] = doc.data();
            
            });
            tagsBas.forEach((doc) => {

                arr_bas[doc.id] = doc.data();
            
            });


            // Consulta os dados de notificações de um usuário e insere dentro da variável notificacoes
            await getDoc(userPrefsNot)
            .then( async (notif) => {
                
                console.log('Entrou no .then do getDoc(userPrefsNot)')

                const notificacoes = notif.data();

                // Consulta os dados de segurança de um usuário e insere dentro da variável seguranca
                await getDoc(userPrefsSeg)
                .then( async (seg) =>{
                    
                    console.log('Entrou no .then do getDoc(userPrefsSeg)')

                    const seguranca = seg.data();                    

                    setDados({basicos: dadosFirestore, notificacoes: notificacoes, seguranca: seguranca, 
                        tags: {basicas: arr_bas, intermediarias: arr_int, avancadas: arr_av}});

                    setLoading(false);
                    
                    // Altera o navegador para Tela Perfil depois de todas as variáveis atualizadas no contexto
                    navigation.navigate('Home');

                })
                .catch((error)=>{

                    console.log(error)
                    setLoading(false);
                }
                );

            })
            .catch((error)=>{

                console.log(error);
                setLoading(false);
            }
            );


        })
        .catch((error) => {

            const errorCode = error.code;
            const errorMessage = error.message;

            setLoading(false);

            if (errorCode === "auth/wrong-password"){

                Alert.alert(
                    "Você errou a senha",
                    "Tente novamente",
                    [   
                        { text: 'Ok', onPress: () => null}            
                    ]
                );

            };
            if (errorCode === "auth/user-not-found"){

                Alert.alert(
                    "Usuário não encontrado",
                    "Tem certeza que você tem uma conta?",
                    [   
                        { text: 'Cadastrar', onPress: () => navigation.navigate('Register')},
                        { text: 'Tentar novamente', onPress: () => null}            
                    ]
                );

            };

            if (errorCode === "auth/invalid-email"){
                Alert.alert(
                    "Você não tem conta",
                    "Deseja criar?",
                    [   
                        { text: 'Não', onPress: () => null},
                        { text: "Sim", onPress: () => navigation.navigate('Register') }                    
                    ]
                );
            };

            console.log('Erro em logarFirebase.signInWithEmailAndPassword: '+ errorCode + ': '+ errorMessage)
        });


    };

    // Função para buscar as postagens
    // (TO-DO) Verificar o que fazer com relação aos refreshs, os dados vão consumir muita memória?
    async function buscarPostagens(){

        // Instância com posts
        const postsRef = collection(db, 'posts');

        // Constante com posts
        let posts = [];

        const q = query(postsRef, orderBy('data', 'desc'), limit(5));

        const docsPosts = await getDocs(q);

        docsPosts.forEach((doc) => {

            let post_completo = doc.data();
            post_completo["id"] = doc.id

            posts = [...posts, post_completo]
            
        });

        return(posts)


    };

    // Função para buscar os comentários de postagens
    async function buscarComentarios(id){

        // Instância com posts
        const comentsRef = collection(db, 'posts' + '/' + id + '/' + 'comentarios');

        // Constante com posts
        let coments = [];

        const q = query(comentsRef, orderBy('data', 'desc'), limit(5));

        const docsComents = await getDocs(q);

        docsComents.forEach((doc) => {

            let coment_completo = doc.data();
            coment_completo["id"] = doc.id

            coments = [...coments, coment_completo]
            
            
        })

        return(coments)
        


    };

    // Função para fazer postagem
    async function fazerPostagem(){
        
    };

    // Função para fazer o logout na Firebase e no AsyncStorage
    function Logout(navigation) {

       // const nav = useNavigation();

        const auth = getAuth();

        signOut(auth).then(() => {

            //navigation.dispatch(StackActions.popToTop())
            

            // Limpa os dados dentro de AsyncStorage
            AsyncStorage.clear()
            .then(() => {

                // Voltar para rotas de autenticação
                navigation.navigate('Opening')
                
            }).catch((error) => {

                console.log("Erro em Logout: " + error)
                
            })

        }).catch((error) => {

            console.log('Erro em Logout.SignOut: ' + error)

        });
       

    };

    // Função para armazenar os dados dentro do AsyncStorage
    async function storeData(value) {

        AsyncStorage.clear()
        .then( ( ) => {

        }).catch((error) => {

            console.log("Erro em Logout: " + e)
        });

        const dadosAsync = await AsyncStorage.setItem("L-earn", JSON.stringify(value))

    };    

    // Função para extrair a categoria dos botões na TelaCadastro
    function pegarCategoria(escolha){
        setCategoria(escolha);
    };

    // Função para redefinir senha pelo e-mail
    async function redefinirSenha(email){

        setLoading(true);
        const auth = getAuth();

        sendPasswordResetEmail(auth, email)
        .then(() => {

            ToastAndroid.show("Te enviamos um e-mail, olha lá", ToastAndroid.SHORT)
            setLoading(false);

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            console.log(errorCode);
            
            setLoading(false);

            if (errorCode === "auth/missing-email"){

                Alert.alert(
                    "Você não tem conta",
                    "Deseja criar?",
                    [   { text: 'Não', onPress: () => null},
                        { text: "Sim", onPress: () => navigation.navigate('Register') }                    
                    ]
                );

            };

            if (errorCode === ""){null}

            console.log('Erro dentro de redefinirSenha: '+ errorCode + ": "+errorMessage)

        });

    };
    
    return(
        <AuthContext.Provider 
            value={{signed: !!dados, dados, cadastrarUsuarioFirestore, pegarCategoria, 
            db, categoria, loadingAuth, logarFirebase, redefinirSenha,
            tagsAvancadas, setTagsAvancadas, cadastrarFirebase,
            loading, setLoading, form, setForm, SwitchState, Logout, loadingAuth, 
            storeData, setLoadingAuth, setDados, uid, buscarPostagens, 
            buscarComentarios, aula, setAula}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;