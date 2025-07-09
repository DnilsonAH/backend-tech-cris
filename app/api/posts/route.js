import 'package:flutter/material.dart';
import 'package:confeciones_tech/screens/auth_screen.dart'; // Crearemos esto
import 'package:confeciones_tech/screens/home_screen.dart'; // Crearemos esto
import 'package:confeciones_tech/services/supabase_service.dart'; // Crearemos esto

Future < void> main() async {
    WidgetsFlutterBinding.ensureInitialized();
    await SupabaseService.initialize(); // Inicializa Supabase
    runApp(const MyApp());
}

class MyApp extends StatelessWidget {
    const MyApp({ super.key });

    @override
  Widget build(BuildContext context) {
        return MaterialApp(
            title: 'Confeciones Tech',
            debugShowCheckedModeBanner: false,
            theme: ThemeData(
                primarySwatch: Colors.lightBlue, // Azul claro como color principal
                hintColor: Colors.cyanAccent, // Otro tono de celeste
                scaffoldBackgroundColor: Colors.white,
                appBarTheme: const AppBarTheme(
                    backgroundColor: Colors.lightBlue, // AppBar en celeste
                    foregroundColor: Colors.white, // Texto de AppBar en blanco
                ),
                    textTheme: const TextTheme(
                        bodyLarge: TextStyle(color: Colors.black87),
                            bodyMedium: TextStyle(color: Colors.black54),
        ),
        // Puedes personalizar más el tema aquí
      ),
        home: StreamBuilder(
            stream: SupabaseService.supabase.auth.onAuthStateChange,
            builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                    return const Scaffold(
                        body: Center(child: CircularProgressIndicator()),
            );
    }
          final user = snapshot.data?.session?.user;
    if(user != null) {
    return const HomeScreen(); // Si hay usuario, ir a la pantalla principal
}
return const AuthScreen(); // Si no, ir a la pantalla de autenticación
        },
      ),
    );
  }
}