export async function Get(id){
    let rawRes = await fetch('http://localhost:3001/check-lobby/?id='+id)
    let res = await rawRes.text();
    if(res == "ok")
        return true;
    return false
}

export async function Create(id){
    await fetch('http://localhost:3001/create-lobby/?id='+id,{
        method:"POST"
    })
}