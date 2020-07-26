
export default class UserService {

    fetchUserData = async (page) => {
        const response = await fetch(
            `https://randomuser.me/api?results=15&seed=hi&page=${page}`
        );
        const json = await response.json();
        return json.results;
    };
}