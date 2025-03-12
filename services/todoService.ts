import { FIREBASE_DB } from "@/config/firebaseConfig";
import { Todo } from "@/types/todo";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";



export const createTodo = async (title: string, userId: string) => {

    const todoData: Omit<Todo, "id"> = {
        title,
        completed: false,
        userId,
        createdAt: new Date(),
    }
    const docRef = await addDoc(collection(FIREBASE_DB, "todos"), todoData)
    return docRef.id;
}

export const getTodos = async (userId: string): Promise<Todo[]> => {
    const q = query(collection(FIREBASE_DB, 'todos'), where("userId", "==", userId))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    } as Todo
    ))
}

export const toggleTodo = async (todoId: string): Promise<void> => {
    const todoRef = doc(FIREBASE_DB, "todos", todoId); 
    const todoSnap = await getDoc(todoRef); 
    if (!todoSnap.exists()) {
      throw new Error(`No todo found with id: ${todoId}`);
    }
    const todo = todoSnap.data() as Todo;
    await updateDoc(todoRef, { completed: !todo.completed });
  };


export const deleteTodo = async (todoId: string): Promise<void> => {
    const todoRef = doc(FIREBASE_DB, "todos", todoId);
    await deleteDoc(todoRef); 
  };