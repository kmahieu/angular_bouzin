
interface IDao<T> {
    addData(data: T[]): Promise<T[]>;
    updateData(data: T[]): Promise<T[]>;
    deleteData(): Promise<T[]>;
}
export default IDao;
