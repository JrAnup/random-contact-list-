const apiURL = 'https://randomuser.me/api?'
let userArgs = []

const fetchUsers = async(params = "results=20") => {
    fetch(apiURL + params ).then (responce =>responce.json()).then((data)=>{
        
        userArgs = data.results
        displayUsers()
    }) .catch(error=>console.log(error))

}

const displayUsers = (args = userArgs) => {
console.log(args)
    let str = ""
    args.map((user, i)=>{
     str += `
     <div class="col-md-6 col-lg-4">
         <div class="card">
             <img src="${user.picture.large}" class="card-img-top" alt="...">
             <div class="card-body">
                 <h5 class="name">${user.name.title} ${user.name.first} ${user.name.last}</h5>
                 <div class="card-text">
                    <ul class="list-group contact-icon">
                        <li class="list-group-item"><i class="fa-solid fa-mobile-retro"></i>${user.cell}</li>
                        <li class="list-group-item"><i class="fa-solid fa-envelope-open"></i> ${user.email}</li>
                        <li class="list-group-item">
                        <i class="fa-solid fa-location-dot"></i> ${user.location.street.number} ${user.location.street.name} ${user.location.city}</li>
                    </ul>
                 </div>
             </div>
         </div>
     </div>
     ` 


   })
   document.getElementById("user-list").innerHTML = str
   document.getElementById("user-count").innerText =args.length
} 

const handleOnChange = (e) => {
    // console.log(e.value)
    const qryStrings = "results=20&gender=" + e.value

    fetchUsers(qryStrings)
}

const handleOnSearch = (e) =>{
    const str = e.value
    const selectedUser = userArgs.filter((user) => {
    const name = user.name.first + " " + user.name.last
    return name.toLowerCase().includes(str.toLowerCase())
})

    displayUsers(selectedUser)
}




fetchUsers();