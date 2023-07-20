export const request = async (uri, method,body) => { 
    try {
        const req=  await fetch(`http://localhost:8080${uri}`, {
            method,
            body,
            headers: { 
              "Content-Type": "application/json"
            }
        })
        
        const res = req.json();
        return res;
    } catch (e) {
        console.log(e)
        // return e
    }
}