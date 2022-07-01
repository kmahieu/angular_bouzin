/* Dao is a class that implements IDao and has a constructor that takes an IDb as a parameter. */
import IDao from "./idao";

// ici on implémentes une classe DAO Générique afin de pouvoir l'injecté dans les components ou l'on en a besoin
// et on vient obligé l'implémentation de certaine méthode vu que l'on impléments notre interface
class Dao<T> implements IDao<T> {

    constructor(){}

    // méthode qui vient ajouté des data au localstorage
    addData(data: T[]): Promise<T[]> {
        localStorage.setItem('data', JSON.stringify(data));
        return Promise.resolve(data);
    }
    // méthode qui vient mettre a jour des data au localstorage
    updateData(data: T[]): Promise<T[]> {
        this.deleteData();
        localStorage.setItem('data', JSON.stringify(data));
        return Promise.resolve(data);
    }

    // méthode qui vient supprimé les data au localstorage
    deleteData(): Promise<T[]> {
        //delete les data au local storage
        localStorage.removeItem('data');
        return Promise.resolve([]);
    }
}
export default Dao
