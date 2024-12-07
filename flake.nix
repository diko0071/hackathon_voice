{
  description = "A dev shell that provides a Python environment from requirements.txt using mach-nix";

  inputs = {
    # Pin the Nixpkgs version you want. Example uses NixOS 23.05.

    # mach-nix input
    mach-nix.url = "github:DavHau/mach-nix";

    nixpkgs.follows = "mach-nix/nixpkgs";
    # Optionally, you can specify a ref or rev to pin a specific mach-nix version
    # mach-nix.rev = "<commit hash>";
    # mach-nix.ref = "refs/tags/<version tag>";
  };

  outputs = { self, nixpkgs, mach-nix }:
    let
      system = "x86_64-linux";
      pkgs = import nixpkgs { inherit system; };
    in {
      devShells.default = pkgs.mkShell {
        # Create a Python environment using mach-nix and requirements.txt
        buildInputs = [
          (mach-nix.mkPythonShell {
            python = pkgs.python310; 
            requirements = builtins.readFile ./requirements.txt;
          })
        ];
      };
    };
}

