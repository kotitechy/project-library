import java.io.*;
import java.util.*;

public class main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int top = n-1 , bottom = 0,count=0;
        int arr[][] = new int[n][n];
        for(int k=0;k<n;k++){
            // left to right
            for(int i=0;i<top;i++){
                    arr[bottom][i] = ++count;
                }

            }
            // top to bottom
            for(int j=0;j<top;j++){
                arr[j][top-1] = ++count;
            }
            // right to left
            for(int i=top-1;i>bottom;i--){
                arr[top-1][i] = ++count;
            }
            // bottom to top
            for(int i=0;i<top;i++){
                arr[top-i][bottom] = ++count;
            }
            for(int i=0;i<n;i++){
                for(int j=0;j<n;j++){
                    System.out.print(arr[i][j]+" ");
                }
                System.out.println();
            }
        }
}