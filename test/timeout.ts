
function timeout_callback(){
    try{
        throw new Error("callback error");
        setTimeout( ()=>{
            timeout_callback();
        })
    }catch( e ){
        console.log( e )
    }

}