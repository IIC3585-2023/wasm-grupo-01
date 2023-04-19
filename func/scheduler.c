int add(int a, int b) {
  return 2 * a + b;
}

char *get_string() {
  return "Hello World!";
}

int main() {
  int a = 1;
  int b = 2;
  int c = add(a, b);
  char *str = get_string();
  return 0;
}