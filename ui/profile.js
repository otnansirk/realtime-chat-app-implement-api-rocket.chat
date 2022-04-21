export const profileUi = (username) => {
    const myUsername = document.getElementById('my-username')
    myUsername.innerHTML = `(${username})`
}