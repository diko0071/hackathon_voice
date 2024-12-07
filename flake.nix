{
  description = "Create Nix development environment";
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";
    pyproject-nix = {
      url = "github:nix-community/pyproject.nix";
      flake = false;
    };
  };
  outputs = { self, nixpkgs, flake-utils, pyproject-nix }:
    let
      pyproject = import (pyproject-nix + "/lib") { inherit (nixpkgs) lib; };
      # Load/parse requirements.txt
      project = pyproject.project.loadRequirementsTxt {
        requirements = ./requirements.txt;
      };
    in
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
        python = pkgs.python311;
        
        # Create a custom Python environment with pip
        pythonWithPackages = python.withPackages (ps: with ps; [
          pip
          virtualenv
        ]);
      in
      {
        devShell = pkgs.mkShell {
          buildInputs = [
              pkgs.postgresql
          ];
          packages = [
            pythonWithPackages
            # PostgreSQL dependencies
            pkgs.postgresql
            pkgs.pkg-config
            # Pillow dependencies
            pkgs.docker-compose
            pkgs.libjpeg
            pkgs.zlib
            pkgs.libtiff
            pkgs.freetype
            pkgs.lcms2
            pkgs.libwebp
            pkgs.tcl
            pkgs.tk
            pkgs.harfbuzz
            pkgs.fribidi
            pkgs.libraqm
            # OpenSSL
            pkgs.openssl
            pkgs.pyright
          ];
          
          shellHook = ''
            # Create and activate a virtual environment if it doesn't exist
            if [ ! -d .venv ]; then
              ${pythonWithPackages}/bin/python -m venv .venv
            fi
            source .venv/bin/activate

            # Set up environment variables for Pillow
            export LDFLAGS="$LDFLAGS -L${pkgs.libjpeg.out}/lib"
            export CPPFLAGS="$CPPFLAGS -I${pkgs.libjpeg.dev}/include"

            if [ -f requirements.txt ]; then
              pip install -r requirements.txt
            fi
          '';
        };
      });
}
